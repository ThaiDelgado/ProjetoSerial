const express = require("express");

const multer  = require('multer')
const upload = multer({ dest: 'uploads/data' })
const verificarLogin = require('../middlewares/verificarLogin');

const userController = require('../controller/userController');

//Responsável por escutar a rota e redirecionar para o método do controller
const routes = express.Router();

//Válida sessão usuário
const auth = require('../middlewares/auth');


//Rota usuário
routes.get('/', verificarLogin, auth, userController.perfil);

//Rota usuário seguir
routes.get('/:nomeUsuario/:id', auth, userController.perfilSeguir);

//Rota Pipocando
routes.get('/pipocando', auth, userController.pipocando);

//Rota Conexões
routes.get('/conexoes', auth, userController.conexoes);

//Rota Feed
routes.get('/feed', auth, userController.feed);

routes.get('/multer')

app.post('/multer', upload.single('avatarFile'), (req, res) => {
    console.log(req.file) // Irá devolver um objeto com as informações do arquivo
    res.send('Upload feito com sucesso!')
  })

module.exports = routes;