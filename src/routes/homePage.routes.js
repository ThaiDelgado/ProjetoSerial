const express = require('express');
const routes = express.Router();
const {check, validationResult, body} = require('express-validator'); // check, validationResult, body

const homePageController = require('../controller/homePageController');



routes.get('/', homePageController.home);
routes.get('/cadastro', homePageController.cadastro);
routes.post('/login',[check("email").isEmail().withMessage('Coloque um email válido'), check("password").isLength({min:6}).withMessage("A senha deve ter mais de 6 caracteres")], homePageController.login);
routes.get('/recuperaSenha', homePageController.passwordDiscovery);
routes.get('/login', homePageController.login); // essa aqui é a rota para acessar a home, ou seja, a página inicial 


module.exports = routes;
