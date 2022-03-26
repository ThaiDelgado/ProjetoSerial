const {api, apiKey} = require('./api');

const findByName = async (name, pageSearch) =>{
    const {data: {page, results, total_pages}} = await api.get(`search/tv?api_key=${apiKey}&query=${name}&page=${pageSearch}&include_adult=false`);
    return {page, results, total_pages};
};

const findByID = async (id) => {
    const {data: serie} = await api.get(`tv/${id}?api_key=${apiKey}&language=pt-BR`);
    return serie;
};

const findSeason = async (id, season) => {
    const {data: serie} = await api.get(`tv/${id}/season/${season}?api_key=${apiKey}&language=pt-BR`);
    return serie;
};

const discover = async (pageOfDiscover) => {
    const {data: {page, results, total_pages}} = await api.get(`discover/tv/?api_key=${apiKey}&language=pt-BR&page=${pageOfDiscover}`);
    return {page, results, total_pages};
};

module.exports = {findByName, findByID, findSeason, discover};