const {check, validationResult, body} = require('express-validator'); // check, validationResult, body
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const uniqId = require('uniqid');

module.exports = {
    home(req,res){
      res.render('homePage');
    },

    registerPage(req, res){
      const isResponseRegister = false;
      res.render('cadastro', { isResponseRegister }); // renderiza a página do cadastro 
    },

    registerUser(req, res){
      const errors = validationResult(req);
      if(errors.isEmpty()){
        const saltRounds = 10;
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const newUser = {
          id: uniqId(),
          name: req.body.name,
          email: req.body.email, 
          password: hash, 
          castFavorites: [],
          castTvShows: [],
          genresTvShows:[],
          followers: [],
          following:[],
          imgProfile: '/images/imgUsuarioPerfil/newUser-img-profile.png',
          imgBackground:'/images/imgUsuarioPerfil/newUser-background.jpg'
        }
        const responseRegister = User.createUser(newUser);
        res.redirect('/login');
      } else {
        res.render('cadastro', { errors: errors.mapped(), old: req.body });
      }      
    },

    passwordDiscovery(req, res){
        res.render('passwordDiscovery')
    }, 

    pageLogin(req,res){
      res.render('login')
    },

    login(req, res){

      const { email, password } = req.body;

      const user = User.getUser(email);

      if(!user){
        return res.send("Usuário ou senha inválidos!");
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if(!isPasswordCorrect){
        return res.send("Usuário ou senha inválidos!");
      }

      req.session.userId = user.id;

      return res.redirect('/usuario');
    }
};