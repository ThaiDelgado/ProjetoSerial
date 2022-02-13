//Criar cadastro usuário

const user = require('../model/user');

module.exports = {

    perfil(req,res){
        res.render('usuarioPerfil');
    },

    feed(req,res){
        res.render('usuarioFeed');
    },

    conexoes(req,res){
        res.render('usuarioConexoes');
    },
    
    pipocando(req,res){
        res.render('usuarioPipocando');
    },

    perfilSeguir(req,res){
        res.render('usuarioSeguir');
    }
    
    //criar função para coletar as séries favoritas do usuário
    //criar no ejs uma função para percorrer o array do objeto e gerar as imagens
};