//Rota geral
const express = require("express");

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();

const userControler = require('../controller/userController');
const episodeController = require('../controller/episodeController');
const serieController = require('../controller/serieController');

//Rota usuário
routes.get('/usuario', userControler.index);

//Rota Episodio
routes.get('/episodio', episodeController.index);

//Rota Serie
routes.get('/serie', serieController.index);

// // rota da página de episodios
// app.get('/series/episodios/id:', (req, res) => {
//    let idEpisodio = req.params.id;
//    let nomeSerie = req.params.nomeSerie || 'Sem nome';
//    let serie = series.find(serie => serie.id == idEpisodio);
//    res.send(serie);
// })

// routes.get('/',serialController ) // aqui chamamos o controller e depois aplicamos se for o caso a API 

module.exports = routes;