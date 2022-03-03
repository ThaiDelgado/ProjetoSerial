const express = require("express");

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();

const userController = require('../controller/userController');

//Rota usuário
routes.get('/', userController.perfil);

//Rota usuário seguir
routes.get('/:nomeUsuario/:id', userController.perfilSeguir);

//Rota Pipocando
routes.get('/pipocando', userController.pipocando);

//Rota Conexões
routes.get('/conexoes', userController.conexoes);

//Rota Feed
routes.get('/feed', userController.feed);


module.exports = routes;