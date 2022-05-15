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
                id_user_episodes_fk: req.session.user.id,
                isNext: false
            }
        });
    
        const cast = await castTvShow.findOne({
            where: {
                idTvShow: req.params.id,
                id_user_cast_fk: req.session.user.id
            }
        });

        const itIsOnFavorite = cast !== null ? cast.isFavorite : false;
        const itIsOnCast = cast !== null ? true : false;
        
        res.render('pgSerie', { userSession: req.session.user, serie, season, itIsOnFavorite, itIsOnCast, comments: serieComments, episodes});    
    },

    async getUserComment(commentUserId) {
        await User.findOne({
            where: {
                id: commentUserId
            }
        });
    },

    async addFavoriteTvShow(req,res){
        await castTvShow.update({
                isFavorite: true
            },
            {            
                where:{
                    idTvShow: req.params.id,
                    id_user_cast_fk: req.session.user.id
                }
        });
        
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async removeFavoriteTvShow(req,res){
        await castTvShow.update({
            isFavorite: false
            },
            {            
            where:{
                idTvShow: req.params.id,
                id_user_cast_fk: req.session.user.id
            }
        });
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async addTvShowToCast(req,res){
        let tvShow = await findByID(req.params.id);
        
        const genresTvShow = tvShow.genres.map(genre => ({
            idGenre: genre.id,
            id_user_genre: req.session.user.id,
            name: genre.name
        })); 
        
        const tvShowDB = await castTvShow.create({
            idTvShow: tvShow.id,
            id_user_cast_fk: req.session.user.id,
            original_name: tvShow.original_name,
            overview: tvShow.overview,
            poster_path: tvShow.poster_path,
            first_air_date: tvShow.first_air_date,
            isFavorite: false,
            episode_run_time: tvShow.episode_run_time,
            genres_tvShow: genresTvShow
        },{
            include: 'genres_tvShow'
        });

        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async removeTvShowToCast(req, res){
        await castTvShow.destroy({
            where: {
                idTvShow: req.params.id,
                id_user_cast_fk: req.session.user.id
            }
        });        
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async addEpisode(req,res){

        const episodeNumberToAdd = req.params.episode_number;
        const episodeTvShowIdToAdd = req.params.id;
        const episodeIdToAdd = req.params.episode_id;
        const episodeSeasonToAdd = req.params.season;
        const userId = req.session.user.id;

        const isPipocando = req.params.pipocando;

        let itIsOnCast = await castTvShow.findOne({
            where: {
                idTvShow: episodeTvShowIdToAdd,
                id_user_cast_fk: userId
            }
        });
        
        if(!itIsOnCast){
            let tvShow = await findByID(req.params.id);
        
            const genresTvShow = tvShow.genres.map(genre => ({
                idGenre: genre.id,
                id_user_genre: req.session.user.id,
                name: genre.name
            })); 
            
            itIsOnCast = await castTvShow.create({
                idTvShow: tvShow.id,
                id_user_cast_fk: req.session.user.id,
                original_name: tvShow.original_name,
                poster_path: tvShow.poster_path,
                first_air_date: tvShow.first_air_date,
                isFavorite: false,
                episode_run_time: tvShow.episode_run_time,
                genres_tvShow: genresTvShow
            },{
                include: 'genres_tvShow'
            });

        };

        await Episode.destroy({
            where:{
                idTvShow: episodeTvShowIdToAdd,
                id_user_episodes_fk: userId,
                isNext: true
            }
        })

        const episodesOnDB = await Episode.findAll({
            where:{
                idTvShow: episodeTvShowIdToAdd,
                id_user_episodes_fk: userId
            },
            order:[
                ['episode_number', 'ASC'],
                ['season','ASC']
            ]
        });

        if(episodesOnDB == [] && episodeSeasonToAdd === 1 && episodeNumberToAdd === 1){
            Episode.create({
                idEpisodes: episodeIdToAdd,
                id_tvshow_episodes_fk: itIsOnCast.id,
                id_user_episodes_fk: userId,
                idTvShow: episodeTvShowIdToAdd,
                season: episodeSeasonToAdd,
                episode_number: episodeNumberToAdd
            });
        } else if(episodeSeasonToAdd >= 1 || episodeNumberToAdd > 1){
            
            let episodesSeasons = [];
            
            for(let index = 1; episodeSeasonToAdd >= index; index++){
                const { episodes } = await findSeason(episodeTvShowIdToAdd,index);
                episodesSeasons = [...episodesSeasons, ...episodes];
            };
            
            const episodeIndexToAdd = episodesSeasons.findIndex(episode => episode.id == episodeIdToAdd);
            
            const episodesToAdd = episodesSeasons.slice(0, (episodeIndexToAdd + 1));

            const nextEpisodes = episodesSeasons.filter(episode => !episodesToAdd.includes(episode));
        
            episodesToAdd.forEach(episode => {
                const episodeIsOnDB = episodesOnDB.findIndex(episodeDB => episodeDB.idEpisodes === episode.id);
                if(episodeIsOnDB == -1){
                    Episode.create({
                        idEpisodes: episode.id,
                        id_tvshow_episodes_fk: itIsOnCast.id,
                        id_user_episodes_fk: userId,
                        idTvShow: episodeTvShowIdToAdd,
                        season: episode.season_number,
                        episode_number: episode.episode_number,
                        name: episode.name,
                        isNext: false
                    });
                };
            }); 
            
            if(nextEpisodes.length !== 0){
                Episode.create({
                    idEpisodes: nextEpisodes[0].id,
                    id_tvshow_episodes_fk: itIsOnCast.id,
                    id_user_episodes_fk: userId,
                    idTvShow: episodeTvShowIdToAdd,
                    season: nextEpisodes[0].season_number,
                    episode_number: nextEpisodes[0].episode_number,
                    name: nextEpisodes[0].name,
                    isNext: true
                });
            }
        }

        if(isPipocando){
            res.redirect(`/usuario/${req.session.user.username}/${req.session.user.id}/pipocando`);
        } else {
            res.redirect(`/serie/${req.params.id}/${req.params.season}`);
        }
    },

    async removeEpisode(req,res){
        Episode.destroy({
            where: {
                idEpisodes: req.params.episode_id,
                id_user_episodes_fk: req.session.user.id
            }
        })
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async postComment(req,res){

        SeriesComment.create({
            id_user_comments_fk: req.session.user.id,
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
                id_user_comments_fk: req.session.user.id
            }
        });
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    }
    
};