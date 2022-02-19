const express = require('express');
const routes = express.Router();


const homePageController = require('../controller/homePageController');



routes.get('/', homePageController.home);
routes.get('/cadastro', homePageController.cadastro);
routes.get('/login', homePageController.login);
routes.get('/recuperaSenha', homePageController.passwordDiscovery);


module.exports = routes;
