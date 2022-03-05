const axios = require('axios');
const db = require('../database/db.json');
const fs = require('fs');

const url = 'https://api.themoviedb.org/3/';
const apiKey = '3a00ae3e8eac3b5e60f644383ee7c942';

const Serie = {
    async findByName(name, pageSearch){
        const {data: {page, results, total_pages}} = await axios.get(`${url}search/tv?api_key=${apiKey}&query=${name}&page=${pageSearch}&include_adult=false`);
        return {page, results, total_pages};
    },

    async findByID(id){
        const {data: serie} = await axios.get(`${url}tv/${id}?api_key=${apiKey}&language=pt-BR`);
        return serie;
    },

    async findSeason(id, season){
        const {data: serie} = await axios.get(`${url}tv/${id}/season/${season}?api_key=${apiKey}&language=pt-BR`);
        return serie;
    },

    async discover(pageOfDiscover){
        const {data: {page, results, total_pages}} = await axios.get(`${url}discover/tv/?api_key=${apiKey}&language=pt-BR&page=${pageOfDiscover}&include_adult=false`);
        return {page, results, total_pages};
    },

    async postComment(idSerie, comment){        
        const index = db.series.findIndex(serie => serie.id_serie === idSerie);
        const comments = index >= 0 ? db.series[index].comments : [];
        let serie = {
            id_serie: idSerie,
            comments: [
                ...comments,
                {
                    id_user: 1,
                    comment: comment
                }
            ]
        }
        index >= 0 ? db.series[index] = serie : db.series.push(serie);        
        const json = JSON.stringify(db);
        fs.writeFileSync( 'src/database/db.json', json);
    },

    async findComments(idSerie){
        let serie = db.series.find(serie => serie.id_serie == idSerie);
        return serie
    }


};

module.exports = Serie;