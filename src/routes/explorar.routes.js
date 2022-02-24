const express = require("express");

const routes = express.Router();

const explorarController = require('../controller/explorarController');

//Rota Explorar -
routes.get('/:page', explorarController.index);

routes.get('/:page/:search', explorarController.search);

module.exports = routes;