const express = require("express");

const routes = express.Router();

const explorarController = require('../controller/explorarController');

//Rota Pesquisar
routes.post('/', explorarController.search);

module.exports = routes;