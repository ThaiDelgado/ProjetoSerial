const { findByName, discover } = require('../services/serieServices');

const Explorar = {

    async index(req,res){
        const pageOfDiscover = parseInt(req.params.page);
        const discoverSeries = await discover(pageOfDiscover);
        const isSearch = false;
        const user = req.session.user;
        res.render('explorar', {discoverSeries, isSearch, user});
    },

    async search(req,res){
        const search = req.query.search;
        const pageOfSearch = parseInt(req.params.page);
        const discoverSeries = await findByName(search, pageOfSearch);
        const isSearch = true;
        const total_pages = discoverSeries.total_pages;
        const user = req.session.user;
        res.render('explorar', {discoverSeries, isSearch, search, total_pages, user});
    }
    
};

module.exports = Explorar;