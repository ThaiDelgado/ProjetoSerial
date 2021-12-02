//Rota geral
const express = require("express");
const routes = express.Router();

const serialController = require('../controller/serialController')
const userControler = require('../controller/userController')

//Rota inicial
routes.get('/login', serialController.login);

//Rota usuário
routes.get('/usuario', userControler.usuario);

// // rota da página de episodios
// app.get('/series/episodios/id:', (req, res) => {
//    let idEpisodio = req.params.id;
//    let nomeSerie = req.params.nomeSerie || 'Sem nome';
//    let serie = series.find(serie => serie.id == idEpisodio);
//    res.send(serie);
// })

// routes.get('/',serialController ) // aqui chamamos o controller e depois aplicamos se for o caso a API 

module.exports = routes;