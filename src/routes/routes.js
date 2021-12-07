//Rota geral
const express = require("express");
const routes = express.Router();

const homeController = require('../controller/homeController')
const userControler = require('../controller/userController')
const pgSerieController = require('../controller/pgSerieController')
const pgEpisodioController = require('../controller/pgEpisodioController')

//Rota inicial
routes.get('/', homeController.home);

//Rota usuário
routes.get('/usuario', userControler.usuario);

//Rota Episodio
routes.get('/episodio', pgEpisodioController.episodio);

//Rota Serie
routes.get('/serie', pgSerieController.serie)

// // rota da página de episodios
// app.get('/series/episodios/id:', (req, res) => {
//    let idEpisodio = req.params.id;
//    let nomeSerie = req.params.nomeSerie || 'Sem nome';
//    let serie = series.find(serie => serie.id == idEpisodio);
//    res.send(serie);
// })

// routes.get('/',serialController ) // aqui chamamos o controller e depois aplicamos se for o caso a API 

module.exports = routes;