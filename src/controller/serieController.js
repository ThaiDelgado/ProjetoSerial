const res = require('express/lib/response');
const { deleteComment } = require('../model/serie');
const Serie = require('../model/serie');
const User = require('../model/user');



module.exports = {
    
    async serieById(req,res){
        const serie = await Serie.findByID(req.params.id);
        const season = await Serie.findSeason(req.params.id, req.params.season);
        const serieComments = await Serie.findComments(req.params.id);
        const userProfile = req.session.user;
        const episodes = userProfile.castTvShows.find(tvShow => tvShow.id == req.params.id);
        
        const itIsOnFavorite = (userProfile.castFavorites.findIndex(tvShow => tvShow.id == req.params.id)) === -1 ? false : true;
        const itIsOnCast = (userProfile.castTvShows.findIndex(tvShow => tvShow.id == req.params.id)) === -1 ? false : true;

        const joinComments = [];

        if(serieComments){
            serieComments.comments.forEach(comment => {
                const userComment = User.getUserById(comment.id_user);
                joinComments.push({
                    user: {
                        id: userComment.id,
                        name: userComment.name,
                        imgProfile: userComment.imgProfile
                    },
                    season: comment.season,
                    comment: comment.comment,
                    comment_id: comment.id_comment
                })
            });
        }
        
        res.render('pgSerie', { user: req.session.user, serie, season, itIsOnFavorite, itIsOnCast, comments: joinComments, episodes});    
    },

    async addFavoriteTvShow(req,res){
        let user = req.session.user;
        let favorite = await Serie.findByID(req.params.id);
        let addSerie = User.putSerieFavorite(favorite, user);
        res.redirect(`/serie/${tvShowId}/${season}`);
    },

    async addTvShowToCast(req,res){
        let user = req.session.user;        
        let tvShow = await Serie.findByID(req.params.id);
        let addSerie = User.putSerieToCast(tvShow, user);
        res.redirect(`/serie/${tvShow.Id}/${season}`);
    },

    async addEpisode(req,res){
        let user = req.session.user;
        let season = req.params.season;
        let episode_number = req.params.episode_number
        let episode_id = req.params.episode_id;
        let tvShow = await Serie.findByID(req.params.id);
        let addEpisode = User.addEpisode(tvShow, season, episode_number, episode_id, user);
        res.redirect(`/serie/${tvShow.Id}/${season}`);
    },

    async removeEpisode(req,res){
        let user = req.session.user;
        let season = req.params.season;
        let episode_number = req.params.episode_number
        let episode_id = req.params.episode_id;
        let tvShowId = req.params.id;
        let removeEpisode = User.removeEpisode(tvShowId, season, episode_number, episode_id, user);
        res.redirect(`/serie/${tvShowId}/${season}`);
    },

    async postComment(req,res){
        let user = req.session.user;
        let season = req.params.season; 
        let tvShowId = req.params.id;
        let comment = req.body.comment;
        await Serie.postComment(tvShowId, season, comment, user);
        res.redirect(`/serie/${tvShowId}/${season}`);        
    },

    deleteComment(req,res){
        let season = req.params.season; 
        let tvShowId = req.params.id;
        let idComment = req.body.idComment;
        Serie.deleteComment(tvShowId, season, idComment);
        res.redirect(`/serie/${tvShowId}/${season}`);
    }
    
};