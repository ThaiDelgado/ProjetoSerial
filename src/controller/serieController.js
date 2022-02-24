const res = require('express/lib/response');
const Serie = require('../model/serie');
const User = require('../model/user');

module.exports = {
    
    async serieById(req,res){
        const serie = await Serie.findByID(req.params.id);
        res.render('pgSerie', { serie });
    },

    addFavoriteTvShow(req,res){
        let addSerie = User.putSerieFavorite(req.params.id);
        res.redirect('/serie/'+ req.params.id);
    },

    addTvShowToCast(serie, userEmail){
    
    },

    addPrivateTagToTvShow(serie, userEmail){
    
    },
    
};