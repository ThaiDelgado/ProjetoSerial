const Serie = require('../model/serie');
const User = require('../model/user');

module.exports = {
    
    async serieById(req,res){
        const serie = await Serie.findByID(req.params.id);
        res.render('pgSerie', { serie });
    },

    addFavoriteTvShow(serie, userEmail){
        let addSerie = User.putSerieFavorite(serie, userEmail);
        return addSerie;
    },

    addTvShowToCast(serie, userEmail){
    
    },

    addPrivateTagToTvShow(serie, userEmail){
    
    },
    
};