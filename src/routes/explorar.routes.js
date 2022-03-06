const express = require("express");

const routes = express.Router();

const explorarController = require('../controller/explorarController');

//Válida sessão usuário
const auth = require('../middlewares/auth');

//Rota Explorar -
routes.get('/:page', auth, explorarController.index);

routes.get('/search/:page', auth, explorarController.search);

module.exports = routes;