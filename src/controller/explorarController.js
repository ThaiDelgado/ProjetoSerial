const serie = require('../model/serie');

const Explorar = {

    async index(req,res){
        const pageOfDiscover = parseInt(req.params.page);
        const discoverSeries = await serie.discover(pageOfDiscover);
        res.render('explorar', {discoverSeries});
    },

    async search(req,res){
        const search = req.query.search;
        const discoverSeries = await serie.findByName(search);
        res.render('explorar', {discoverSeries});
    }
    
};

module.exports = Explorar;