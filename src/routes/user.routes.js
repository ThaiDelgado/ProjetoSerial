const express = require("express");
const verificarLogin = require('../middlewares/verificarLogin');

const userController = require('../controller/userController');

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();

const path = require('path');

//Válida sessão usuário
const auth = require('../middlewares/auth');

const uploadPictureProfile = require('../middlewares/uploadPictureProfile');
const uploadPictureBackground = require('../middlewares/uploadPictureBackground');

//Rota usuário
routes.get('/:nomeUsuario/:id', verificarLogin, auth, userController.perfil);

routes.put('/:nomeUsuario/:id', verificarLogin, auth, userController.follow);

//Pesquisa usuário
routes.get('/search', verificarLogin, auth, userController.search);

//Rota Pipocando
routes.get('/:nomeUsuario/:id/pipocando', auth, userController.pipocando);

//Rota Conexões
routes.get('/:nomeUsuario/:id/conexoes', auth, userController.conexoes);

//Rota Feed
routes.get('/:nomeUsuario/:id/feed', auth, userController.feed);

//Rota Settings
routes.get('/:nomeUsuario/:id/settings', auth, userController.settings)

routes.post('/:nomeUsuario/:id/settings/profile-picture', uploadPictureProfile, userController.imgProfile);

routes.post('/:nomeUsuario/:id/settings/background-picture', uploadPictureBackground, userController.imgBackground);


module.exports = routes;