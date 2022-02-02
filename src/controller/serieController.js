const Serie = require('../model/serie');

module.exports = {
    
    index(req,res){
        res.render('pgSerie');
    },

    async show(req, res) {
        const serie = await Serie.findByID(req.params.id);
        return res.json(serie);
    },
    
};