const { User } = require('../models');
const { castTvShow } = require('../models');
const { Episode } = require('../models');
const { Genre } = require('../models');
const { SeriesComment } = require('../models');
const { Op } = require('sequelize');
const { findByName, findByID, findSeason, discover } = require('../services/serieServices');

module.exports = {
    
    async serieById(req,res){
        const serie = await findByID(req.params.id);
        const season = await findSeason(req.params.id, req.params.season);
        const serieComments = await SeriesComment.findAll({
            where: {
                idTvShow: req.params.id
            },
            include: 'user_comment'
        });

        const episodes = await Episode.findAll({
            raw:true,
            where:{                
                idTvShow: serie.id,
                id_user_episodes_fk: req.session.userId
            }
        });
        
        const itIsOnFavorite = (await castTvShow.findOne({
            where: {
                id_user_cast_fk: req.session.userId,
                isFavorite: 1
            }
        })) === null ? false : true;
     
        const itIsOnCast = (await castTvShow.findOne({
            where: {
                idTvShow: req.params.id,
                id_user_cast_fk: req.session.userId
            }
        })) === null ? false : true;

        const user = req.session.userId;
        
        res.render('pgSerie', { user, serie, season, itIsOnFavorite, itIsOnCast, comments: serieComments, episodes});    
    },

    async getUserComment(commentUserId) {
        await User.findOne({
            where: {
                id: commentUserId
            }
        });
    },

    async addFavoriteTvShow(req,res){
        castTvShow.update({
            isFavorite: true
        },
        {            
            where:{
                idTvShow: req.params.id,
                id_user_cast_fk: req.session.userId
            }
        });
        
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    removeFavoriteTvShow(req,res){
        castTvShow.update({
            isFavorite: false
        },
        {            
            where:{
                idTvShow: req.params.id,
                id_user_cast_fk: req.session.userId
            }
        });
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async addTvShowToCast(req,res){
        let tvShow = await findByID(req.params.id);
        await castTvShow.create({
            idTvShow: tvShow.id,
            id_user_cast_fk: req.session.userId,
            original_name: tvShow.original_name,
            poster_path: tvShow.poster_path,
            first_air_date: tvShow.first_air_date,
            isFavorite: false,
            episode_run_time: tvShow.episode_run_time
        });

        const castInfo = await castTvShow.findOne({
            raw: true,
            where:{
                idTvShow: tvShow.id,
                id_user_cast_fk: req.session.userId
            }
        });

        tvShow.genres.forEach(genre => {
            Genre.create({
                idGenre: genre.id,
                id_user_genre: req.session.userId,
                id_tvshow_genre: castInfo.id,
                name: genre.name
            });
        });        
        
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    removeTvShowToCast(req, res){
        castTvShow.destroy({
            where: {
                idTvShow: req.params.id,
                id_user_cast_fk: req.session.userId
            }
        });        
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async addEpisode(req,res){

        const itIsOnCast = await castTvShow.findOne({
            where: {
                idTvShow: req.params.id,
                id_user_cast_fk: req.session.userId
            }
        });

        if(itIsOnCast){
            Episode.create({
                idEpisodes: req.params.episode_id,
                id_tvshow_episodes_fk: itIsOnCast.id,
                id_user_episodes_fk: req.session.userId,
                idTvShow: req.params.id,
                season: req.params.season,
                episode_number: req.params.episode_number
            })
        }

        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async removeEpisode(req,res){
        Episode.destroy({
            where: {
                idEpisodes: req.params.episode_id,
                id_user_episodes_fk: req.session.userId
            }
        })
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async postComment(req,res){

        SeriesComment.create({
            id_user_comments_fk: req.session.userId,
            idTvShow: req.params.id,
            season: req.params.season,
            comment: req.body.comment
        });

        res.redirect(`/serie/${req.params.id}/${req.params.season}`);        
    },

    deleteComment(req,res){
        SeriesComment.destroy({
            where: {
                id: req.params.idComment,
                id_user_comments_fk: req.session.userId
            }
        });
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    }
    
};