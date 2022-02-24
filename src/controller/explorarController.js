const serie = require('../model/serie');

const Explorar = {

    async index(req,res){
        const page = parseInt(req.params.page);
        const discoverSeries = await serie.discover(page);
        res.render('explorar', {discoverSeries, page});
    },

    async search(req,res){
        const search = req.body;
        console.log(search)
        const discoverSeries = await serie.findByName(search);
        res.render('explorar', {discoverSeries});
    }
    
};

module.exports = Explorar;