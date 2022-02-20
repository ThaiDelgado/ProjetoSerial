const Serie = require('../model/serie');

module.exports = {
    
    async serieById(req,res){
        const serie = await Serie.findByID(req.params.id);
        console.log(serie);
        res.render('pgSerie', { serie });
    },
    
};