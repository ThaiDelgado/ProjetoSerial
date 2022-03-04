const {check, validationResult, body} = require('express-validator'); // check, validationResult, body
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

module.exports = {
    home(req,res){
        res.render('homePage');
    },

    cadastro(req, res){
        res.render('cadastro'); // renderiza a página do cadastro 
    },

    cadastrar(req, res){
        const saltRounds = 10;
        const arquivo = fs.readFileSync(path.join(__dirname, '..', 'database', 'db.json'), {
            enconding: 'utf-8'}) // essa parte, ao fazer o cadastro ele vai escrever no nosso banco de dados.
            const objeto = JSON.parse(arquivo)
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            const {users} = objeto // esse usuarios tem que estar no banco de dados. Certificar qual o nome esta no banco de dados.
            const novoUsuario = {
              nome: req.body.nome,
              email: req.body.email, 
              password: hash,
              
            }
            users.push(novoUsuario);
            objeto.users = users;
            const  objetoEmString  = JSON.stringify(objeto)
            fs.writeFileSync(path.join(__dirname, '..', 'database', 'db.json'),objetoEmString);
            res.send('Cadastro realizado com sucesso!');
    

    },

    login(req,res){
        res.render('login')
    },

    passwordDiscovery(req, res){
        res.render('passwordDiscovery')
    }, 

    fazerLogin(req, res){
        const arquivo = fs.readFileSync(path.join(__dirname, '..', 'database', 'db.json'), {
            encoding: 'utf-8'
          });
          const objeto = JSON.parse(arquivo)
          const meuUsuario = objeto.users.find(usuario => usuario.email === req.body.users)
      
          if (!meuUsuario) {
            return res.send('Usuário ou senha inválidos');
          }
      
          const senhaEstaCorreta = bcrypt.compareSync(req.body.password, meuUsuario.password)
      
          if (!senhaEstaCorreta) {
            return res.send('Usuário ou senha inválidos');
          }
      
          delete meuUsuario.senha;
          req.session.users = meuUsuario;
      
          res.redirect('/');
    }

    // verificarLogin(req, res){
    //     const errors = validationResult(req);
    //     if(!errors.isEmpty()){
    //         res.redirect('/');
    //     } else{
    //         res.redirect('/usuario'); // 
    //     }
        
        
    // }

};