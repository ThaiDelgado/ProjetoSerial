const axios = require('axios');
const db = require('../database/db.json');
const fs = require('fs');
const { userInfo } = require('os');

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
        const {data: {page, results, total_pages}} = await axios.get(`${url}discover/tv/?api_key=${apiKey}&language=pt-BR&page=${pageOfDiscover}`);
        return {page, results, total_pages};
    },

    async postComment(idSerie, season, comment, userSession){        
        const index = db.seriesComments.findIndex(serieComment => serieComment.id_serie === idSerie);
        const serie = await this.findByID(idSerie);
        console.log(serie);        
        const comments = index >= 0 ? db.seriesComments[index].comments : [];
        console.log(comments);
        let serieComment = {
            id_serie: idSerie,
            name_serie: serie.original_name,
            comments: [
                ...comments,
                {
                    id_user: userSession.id,
                    user_name: userSession.name,
                    user_img: userSession.imgProfile,
                    season: season,
                    comment: comment
                }
            ]
        }
        console.log(serieComment);

        index >= 0 ? db.seriesComments[index] = serie : db.seriesComments.push(serieComment);
        console.log(db);        
        const json = JSON.stringify(db);
        fs.writeFileSync( 'src/database/db.json', json);
        console.log('MODEL - Comentário feito com sucesso!');
        return "Comentário feito com sucesso!"
    },

    async findComments(idSerie){
        let serie = db.seriesComments.find(serie => serie.id_serie == idSerie);
        return serie
    }
};

module.exports = Serie;