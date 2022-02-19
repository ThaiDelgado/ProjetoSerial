const express = require('express');
const routes = express.Router();


const homeController = require('../controller/homeController')
const loginController = require('../controller/loginController')
const recuperaSenhaController = require('../controller/recuperaSenhaController')
const cadastroController = require("../controller/cadastroController");



routes.get('/', homeController.index);
routes.get('/login', loginController.index);
routes.get('/recuperaSenha', recuperaSenhaController.index);
routes.get('/cadastro', cadastroController.index);


module.exports = routes;
