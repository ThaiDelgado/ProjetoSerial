//Rota geral
const express = require("express");

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();


const episodeController = require('../controller/episodeController');
const callendarController = require('../controller/callendarController')
const userController = require('../controller/userController'); 


//Rota Episodio
routes.get('/episodio', episodeController.index);

//Rota Calendário
routes.get('/calendario', callendarController.index)


// // rota da página de episodios
// app.get('/series/episodios/id:', (req, res) => {
//    let idEpisodio = req.params.id;
//    let nomeSerie = req.params.nomeSerie || 'Sem nome';
//    let serie = series.find(serie => serie.id == idEpisodio);
//    res.send(serie);
// })

// routes.get('/',serialController ) // aqui chamamos o controller e depois aplicamos se for o caso a API 

module.exports = routes;