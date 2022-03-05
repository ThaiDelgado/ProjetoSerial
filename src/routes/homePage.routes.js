const express = require('express');

const {check, validationResult, body} = require('express-validator'); // check, validationResult, body
const { verificarLogin } = require('../controller/homePageController');
const logDoCadastro = require('../middlewares/logCadastro');
const homePageController = require('../controller/homePageController');
const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { time } = require('console');

const routes = express.Router();


//Rota Home
routes.get('/', homePageController.home);

//Rota Cadastro
routes.get('/cadastro', logDoCadastro, homePageController.registerPage);

//Rota Cadastro Registro Usuário
routes.post('/cadastro', logDoCadastro, homePageController.registerUser);


routes.get('/recuperaSenha', homePageController.passwordDiscovery);

routes.get('/login', homePageController.login); 
 
routes.post('/login', homePageController.fazerLogin);


module.exports = routes;
