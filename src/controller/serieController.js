const res = require('express/lib/response');
const Serie = require('../model/serie');
const User = require('../model/user');



module.exports = {
    
    async serieById(req,res){
        const serie = await Serie.findByID(req.params.id);
        const season = await Serie.findSeason(req.params.id, req.params.season);
        const serieComments = await Serie.findComments(req.params.id);
        const email = "humberto.galdino@live.com";
        const userProfile = User.getUser(email);
        const episodes = userProfile.castTvShows.find(tvShow => tvShow.id == req.params.id);

        const itIsOnFavorite = (userProfile.castFavoritos.findIndex(tvShow => tvShow.id == req.params.id)) === -1 ? false : true;
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
                    comment: comment.comment
                })
            });
        }
        
        res.render('pgSerie', { serie, season, itIsOnFavorite, itIsOnCast, comments: joinComments, episodes});    
    },

    async addFavoriteTvShow(req,res){
        let favorite = await Serie.findByID(req.params.id);
        let addSerie = await User.putSerieFavorite(favorite);
        res.redirect(`/serie/${req.params.id}/1`);
    },

    async addTvShowToCast(req,res){        
        let tvShow = await Serie.findByID(req.params.id);
        let addSerie = await User.putSerieToCast(tvShow);
        res.redirect(`/serie/${req.params.id}/1`);
    },

    async addEpisode(req,res){
        let tvShow = await Serie.findByID(req.params.id);
        let addEpisode = await User.addEpisode(tvShow,req.params.season, req.params.episode_number, req.params.episode_id);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async removeEpisode(req,res){
        let tvShow = await Serie.findByID(req.params.id);
        let removeEpisode = await User.removeEpisode(tvShow, req.params.season, req.params.episode_number, req.params.episode_id);
        res.redirect(`/serie/${req.params.id}/${req.params.season}`);
    },

    async postComment(req,res){
        await Serie.postComment(req.params.id, req.body.comment);
        res.redirect(`/serie/${req.params.id}/1`);        
    }
    
};