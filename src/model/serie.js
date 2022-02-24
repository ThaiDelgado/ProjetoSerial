const axios = require('axios');

const url = 'https://api.themoviedb.org/3/';
const apiKey = '3a00ae3e8eac3b5e60f644383ee7c942';

module.exports = {
    async findByName(name){
        const {data: {page, results}} = await axios.get(`${url}search/tv?api_key=${apiKey}&query=${name}`);
        console.log(results);
        console.log(page);
        return results;
    },

    async findByID(id){
        const {data: serie} = await axios.get(`${url}tv/${id}?api_key=${apiKey}&language=pt-BR`);
        return serie;
    },

    async discover(page){
        const {data: {results}} = await axios.get(`${url}discover/tv/?api_key=${apiKey}&language=pt-BR&page=${page}`);
        return results;
    }
};