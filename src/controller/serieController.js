const res = require('express/lib/response');
const { deleteComment } = require('../model/serie');
const Serie = require('../model/serie');
const User = require('../model/user');



module.exports = {
    
    async serieById(req,res){
        const serie = await Serie.findByID(req.params.id);
        const season = await Serie.findSeason(req.params.id, req.params.season);
        const serieComments = await Serie.findComments(req.params.id);
        const userProfile = User.getUserById(req.session.userId);
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
        
        res.render('pgSerie', { user: userProfile, serie, season, itIsOnFavorite, itIsOnCast, comments: joinComments, episodes});    
    },

    async addFavoriteTvShow(req,res){
        let user = User.getUserById(req.session.userId);
        let tvShow = await Serie.findByID(req.params.id);
        let addSerieFavorite = User.putSerieFavorite(tvShow, user);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    removeFavoriteTvShow(req,res){
        let user = User.getUserById(req.session.userId);;
        let removeSerie = User.removeSerieFavorite(req.params.id, user);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async addTvShowToCast(req,res){
        let user = User.getUserById(req.session.userId);
        let tvShow = await Serie.findByID(req.params.id);
        let addSerie = User.putSerieToCast(tvShow, user);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async addEpisode(req,res){
        let user = User.getUserById(req.session.userId);
        let tvShow = await Serie.findByID(req.params.id);
        let addEpisode = User.addEpisode(tvShow, req.params.season, req.params.episode_number, req.params.episode_id, user);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async removeEpisode(req,res){
        let user = User.getUserById(req.session.userId);
        let removeEpisode = User.removeEpisode(req.params.id, req.params.season, req.params.episode_number, req.params.episode_id, user);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async postComment(req,res){
        let user = User.getUserById(req.session.userId);;
        await Serie.postComment(req.params.id, req.params.season, req.body.comment, user);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);        
    },

    deleteComment(req,res){
        Serie.deleteComment(req.params.id, req.params.season, req.body.idComment);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    }
    
};