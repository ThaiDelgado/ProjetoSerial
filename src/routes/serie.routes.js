//Rota geral
const express = require("express");

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();

//Válida sessão usuário
const auth = require('../middlewares/auth');

const serieController = require('../controller/serieController');

//Rota Serie
routes.get('/:id/:season', auth, serieController.serieById);

//Rota Comentário Série
routes.post('/:id/:season', auth, serieController.postComment);

//Rota Insere Série Favorita
routes.put('/:id/:season/favorite', auth, serieController.addFavoriteTvShow);

//Rota Insere Série no cast do usuário
routes.put('/:id/:season/adicionar', auth, serieController.addTvShowToCast);

//Rota Insere Episódio
routes.put('/:id/:season/:episode_number/:episode_id', auth, serieController.addEpisode);

//Rota Remove Episódio
routes.delete('/:id/:season/:episode_number/:episode_id', auth, serieController.removeEpisode);   

module.exports = routes;