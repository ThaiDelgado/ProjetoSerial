const Serie = require('../model/serie');

const Explorar = {

    async index(req,res){
        const pageOfDiscover = parseInt(req.params.page);
        const discoverSeries = await Serie.discover(pageOfDiscover);
        const isSearch = false;
        res.render('explorar', {discoverSeries, isSearch});
    },

    async search(req,res){
        const search = req.query.search;
        const pageOfSearch = parseInt(req.params.page);
        const discoverSeries = await Serie.findByName(search, pageOfSearch);
        const isSearch = true;
        const total_pages = discoverSeries.total_pages
        res.render('explorar', {discoverSeries, isSearch, search, total_pages});
    }
    
};

module.exports = Explorar;