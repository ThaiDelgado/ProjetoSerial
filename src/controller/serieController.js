const res = require('express/lib/response');
const Serie = require('../model/serie');
const User = require('../model/user');



module.exports = {
    
    async serieById(req,res){
        const serie = await Serie.findByID(req.params.id);
        const season = await Serie.findSeason(req.params.id, req.params.season);
        const serieComments = await Serie.findComments(req.params.id);

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
        
        res.render('pgSerie', { serie, season, comments: joinComments });
    },

    async addFavoriteTvShow(req,res){
        let favorite = await serie.findByID(id);
        let addSerie = await User.putSerieFavorite(favorite);
        res.redirect('/serie/'+ req.params.id);
    },

    async addTvShowToCast(req,res){        
        let tvShow = await serie.findByID(id);
        let addSerie = await User.putSerieToCast(tvShow);
        res.redirect('/serie/'+ req.params.id);
    },

    async postComment(req,res){
        let idSerie = req.params.id;
        let comment = req.body.comment;
        await Serie.postComment(idSerie,comment);
        res.redirect(`/serie/${idSerie}/1`);        
    }
    
};