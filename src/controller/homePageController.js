const {check, validationResult, body} = require('express-validator'); // check, validationResult, body
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const uniqId = require('uniqid')
const alert = require('alert');

module.exports = {
    home(req,res){
        res.render('homePage');
    },

    registerPage(req, res){
      const isResponseRegister = false;
      res.render('cadastro', { isResponseRegister, alert }); // renderiza a página do cadastro 
    },

    registerUser(req, res){
        const saltRounds = 10;
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const newUser = {
          id: uniqId(),
          name: req.body.nome,
          email: req.body.email, 
          password: hash, 
          castFavorites: [],
          castTvShows: [],
          genresTvShows:[],
          timekeeper: 0,
          episodes: 0,
          followers: [],
          following:[],
          imgProfile: '',
          imgBackground:''
        }
        const isResponseRegister = User.createUser(newUser);
        res.send(isResponseRegister);
    },

    login(req,res){
        res.render('login')
    },

    passwordDiscovery(req, res){
        res.render('passwordDiscovery')
    }, 

    fazerLogin(req, res){
          const meuUsuario = User.getUser(req.body.email);
      
          if (!meuUsuario) {
            return res.send('Usuário inválido!');
          }
      
          const senhaEstaCorreta = bcrypt.compareSync(req.body.password, meuUsuario.password)
      
          if (!senhaEstaCorreta) {
            return res.send('Senha inválida!');
          }
      
          delete meuUsuario.senha;
          req.session.users = meuUsuario;
      
          res.redirect('/usuario');
    }
};