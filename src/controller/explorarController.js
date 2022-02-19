const serie = require('../model/serie');

module.exports = {

    async index(req,res){
        const discoverSeries = await serie.discover();
        res.render('explorar', {discoverSeries});
    },
    
};