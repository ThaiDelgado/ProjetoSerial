const express = require('express');

const { verificarLogin } = require('../controller/homePageController');
const {check, validationResult, body} = require('express-validator');
const homePageController = require('../controller/homePageController');
const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { time } = require('console');

const validateRegister = [ 
    check('name')
        .notEmpty().withMessage('O nome deve ser preenchido!'),
    check('email')
        .notEmpty().withMessage('O e-mail deve ser preenchido!').bail()        
        .isEmail().withMessage('Digite um e-mail válido!'),
    check('password')
        .notEmpty().withMessage('A senha deve ser preenchida!').bail()
        .isLength({min: 6}).withMessage('A senha deve conter pelo menos 8 caracteres!')
];

const validateLogin = [ 
    check('email')
        .notEmpty().withMessage('O e-mail deve ser preenchido!').bail()        
        .isEmail().withMessage('Digite um e-mail válido!'),
    check('password')
        .notEmpty().withMessage('A senha deve ser preenchida!').bail()
        .isLength({min: 8}).withMessage('A senha deve conter pelo menos 8 caracteres!')
];


const routes = express.Router();


//Rota Home
routes.get('/', homePageController.home);

//Rota Cadastro
routes.get('/cadastro', homePageController.registerPage);

//Rota Cadastro Registro Usuário
routes.post('/cadastro', validateRegister, homePageController.registerUser);

//Rota Página Login
routes.get('/login', homePageController.pageLogin); 

//Rota Login Usuário
routes.post('/login', validateLogin, homePageController.login);


routes.get('/recuperaSenha', homePageController.passwordDiscovery);


module.exports = routes;
