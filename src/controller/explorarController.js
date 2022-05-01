const { findByName, discover } = require('../services/serieServices');

const Explorar = {

    async index(req,res){
        const pageOfDiscover = parseInt(req.params.page);
        const discoverSeries = await discover(pageOfDiscover);
        const isSearch = false;
        res.render('explorar', {discoverSeries, isSearch, userSession: req.session.user});
    },

    async search(req,res){
        const search = req.query.search;
        const pageOfSearch = parseInt(req.params.page);
        const discoverSeries = await findByName(search, pageOfSearch);
        const isSearch = true;
        const total_pages = discoverSeries.total_pages;
        res.render('explorar', {discoverSeries, isSearch, search, total_pages, userSession: req.session.user});
    }
    
};

module.exports = Explorar;