const express = require('express');
const routes = express.Router();
const {check, validationResult, body} = require('express-validator'); // check, validationResult, body
const { verificarLogin } = require('../controller/homePageController');
const logDoCadastro = require('../middlewares/logCadastro');
const homePageController = require('../controller/homePageController');
const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const { time } = require('console');



routes.get('/', homePageController.home);
routes.get('/cadastro', logDoCadastro, homePageController.cadastro);
routes.post('/cadastro',(req, res) => {
    const arquivo = fs.readFileSync(path.join(__dirname, '..', 'database', 'db.json'), {
        enconding: 'utf-8'}) // essa parte, ao fazer o cadastro ele vai escrever no nosso banco de dados.
        const objeto = JSON.parse(arquivo)
        const {users} = objeto // esse usuarios tem que estar no banco de dados. Certificar qual o nome esta no banco de dados.
        const novoUsuario = {
          email: req.body.email, 
          password: req.body.password, 
          eh_admin: false
        }
        users.push(novoUsuario);
        objeto.users = users;
        const  objetoEmString  = JSON.stringify(objeto)
        fs.writeFileSync(path.join(__dirname, '..', 'database', 'db.json'),objetoEmString);
        res.send('Cadastro realizado com sucesso!');

});
routes.post('/login',[check("email").isEmail().withMessage('Coloque um email válido'), check("password").isLength({min:6}).withMessage("A senha deve ter mais de 6 caracteres")], homePageController.verificarLogin);
routes.get('/recuperaSenha', homePageController.passwordDiscovery);
routes.get('/login', homePageController.login); // essa aqui é a rota para acessar a home, ou seja, a página inicial 


module.exports = routes;
