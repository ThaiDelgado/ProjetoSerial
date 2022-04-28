const {check, validationResult, body} = require('express-validator'); // check, validationResult, body
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../models');


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
        User.create({
          name: req.body.name,
          email: req.body.email, 
          username: req.body.username,
          password: hash, 
          imgProfile: '/images/imgUsuarioPerfil/newUser-img-profile.png',
          imgBackground:'/images/imgUsuarioPerfil/newUser-background.jpg'
        });
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

    async login(req, res){

      const { email, password } = req.body;

      const user = await User.findOne({  
          where: { 
            email: email 
          } 
        })

      if(!user){
        return res.send("Usuário ou senha inválidos!");
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if(!isPasswordCorrect){
        return res
          .status(401)
          .render('login', {mesage: "Usuário ou senha inválidos!"});
      }

      user.password = null;

      req.session.user = user;

      return res.redirect(`/usuario/${user.username}/${user.id}`);
    },

    async logoff(req,res){
      delete req.session.userId
      return res.redirect('/');
    }
};