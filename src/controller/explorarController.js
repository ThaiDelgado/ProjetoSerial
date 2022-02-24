const serie = require('../model/serie');

module.exports = {

    async index(req,res){
        const page = parseInt(req.params.page);
        const discoverSeries = await serie.discover(page);
        res.render('explorar', {discoverSeries, page});
    },
    
};