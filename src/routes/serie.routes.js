//Rota geral
const express = require("express");

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();

const serieController = require('../controller/serieController');

//Rota Serie
routes.get('/:id/:season', serieController.serieById);

routes.post('/:id/:season', serieController.postComment);

//Rota Insere Série Favorita
routes.put('/:id/favorite', serieController.addFavoriteTvShow);

//Rota Insere Série no cast do usuário
routes.put('/:id/adicionar', serieController.addTvShowToCast);



module.exports = routes;