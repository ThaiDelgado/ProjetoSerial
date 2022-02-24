const res = require('express/lib/response');
const Serie = require('../model/serie');
const User = require('../model/user');

module.exports = {
    
    async serieById(req,res){
        const serie = await Serie.findByID(req.params.id);
        res.render('pgSerie', { serie });
    },

    async addFavoriteTvShow(req,res){
        let addSerie = await User.putSerieFavorite(req.params.id);
        res.redirect('/serie/'+ req.params.id);
    },

    async addTvShowToCast(req,res){
        let addSerie = await User.putSerieToCast(req.params.id);
        res.redirect('/serie/'+ req.params.id);
    },
    
};