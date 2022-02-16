
const express = require("express");
const routes = express.Router();

const callendarController = require('../controller/callendarController');

//Rota Calendário
routes.get('/', callendarController.index);

module.exports = routes;