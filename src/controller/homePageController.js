const {check, validationResult, body} = require('express-validator'); // check, validationResult, body
const fs = require('fs');
const path = require('path');

module.exports = {
    home(req,res){
        res.render('homePage');
    },

    cadastro(req, res){
        res.render('cadastro');
    },

    login(req,res){
        res.render('login')
    },

    passwordDiscovery(req, res){
        res.render('passwordDiscovery')
    }, 

    verificarLogin(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.redirect('/');
        } else{
            res.redirect('/usuario'); // 
        }
        
        
    }

};