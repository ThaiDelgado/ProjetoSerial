const express = require('express');
const routes = express.Router();
const {check, validationResult, body} = require('express-validator'); // check, validationResult, body
const { verificarLogin } = require('../controller/homePageController');
const logDoCadastro = require('../middlewares/logCadastro');
const homePageController = require('../controller/homePageController');



routes.get('/', homePageController.home);
routes.get('/cadastro', logDoCadastro, homePageController.cadastro);
routes.post('/login',[check("email").isEmail().withMessage('Coloque um email válido'), check("password").isLength({min:6}).withMessage("A senha deve ter mais de 6 caracteres")], homePageController.verificarLogin);
routes.get('/recuperaSenha', homePageController.passwordDiscovery);
routes.get('/login', homePageController.login); // essa aqui é a rota para acessar a home, ou seja, a página inicial 


module.exports = routes;
