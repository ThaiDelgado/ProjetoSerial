const axios = require('axios');

module.exports = {
    async findByName(name){
        const {data: serie} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=3a00ae3e8eac3b5e60f644383ee7c942&language=pt-BR&query=${name}`);
        return serie;
    },

    async findByID(id){
        const {data: serie} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=3a00ae3e8eac3b5e60f644383ee7c942&language=pt-BR`);
        return serie;
    }
};