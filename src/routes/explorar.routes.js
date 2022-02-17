const express = require("express");

const routes = express.Router();

const explorarController = require('../controller/explorarController');

//Rota Explorar -
routes.get('/', explorarController.index);

module.exports = routes;