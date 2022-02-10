//Rota geral
const express = require("express");

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();

const homeController = require('../controller/homeController')
const loginController = require('../controller/loginController')
const recuperaSenhaController = require('../controller/recuperaSenhaController')
const cadastroController = require("../controller/cadastroController");
const emailConfirmacao = require('../controller/emailConfirmacao')
const userControler = require('../controller/userController');
const episodeController = require('../controller/episodeController');
const serieController = require('../controller/serieController');
const explorarController = require('../controller/explorarController');
const conexoesController = require('../controller/conexoesController');
const feedController = require('../controller/feedController');
const callendarController = require('../controller/callendarController')




//Rota inicial
routes.get('/', homeController.index);

//Rota Login
routes.get('/login', loginController.index);

//Rota Recuperação de Senha
routes.get('/recuperaSenha', recuperaSenhaController.index);

//Rota Cadastro
routes.get('/cadastro', cadastroController.index);

routes.post('/emailConfirmacao', emailConfirmacao.index);

//Rota usuário
routes.get('/usuario', userControler.index);

//Rota Episodio
routes.get('/episodio', episodeController.index);

//Rota Serie
routes.get('/serie', serieController.index);

//Rota Explorar -
routes.get('/explorar', explorarController.index);

//Rota Conexoes
routes.get('/conexoes', conexoesController.index);

//Rota Feed
routes.get('/feed', feedController.index);

//Rota Calendário
routes.get('/calendario', callendarController.index)


// // rota da página de episodios
// app.get('/series/episodios/id:', (req, res) => {
//    let idEpisodio = req.params.id;
//    let nomeSerie = req.params.nomeSerie || 'Sem nome';
//    let serie = series.find(serie => serie.id == idEpisodio);
//    res.send(serie);
// })

// routes.get('/',serialController ) // aqui chamamos o controller e depois aplicamos se for o caso a API 

module.exports = routes;