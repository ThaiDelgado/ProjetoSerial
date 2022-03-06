const express = require("express");

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();

//Válida sessão usuário
const auth = require('../middlewares/auth');

const callendarController = require('../controller/callendarController');

//Rota Calendário
routes.get('/', auth, callendarController.index);

module.exports = routes;