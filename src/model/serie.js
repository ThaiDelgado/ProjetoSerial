const axios = require('axios');

const url = 'https://api.themoviedb.org/3/';
const apiKey = '3a00ae3e8eac3b5e60f644383ee7c942';

module.exports = {
    async findByName(name){
        const {data: serie} = await axios.get(`${url}search/tv?api_key=${apiKey}&language=pt-BR&query=${name}`);
        return serie;
    },

    async findByID(id){
        const {data: serie} = await axios.get(`${url}tv/${id}?api_key=${apiKey}&language=pt-BR`);
        return serie;
    },

    async discover(){
        const {data: {results}} = await axios.get(`${url}discover/tv/?api_key=${apiKey}&language=pt-BR`);
        return results;
    }
};