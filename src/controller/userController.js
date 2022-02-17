//Criar cadastro usuário
const User = require('../model/user');

module.exports = {

    perfil(req,res){
        res.render('usuarioPerfil');
    },
    
    perfilComPesquisa(req,res){
        const searchTerm = req.query["name"];
        const users = User.filterByName(searchTerm)
        res.render('usuarioPerfil', { users });
    },
    
    feed(req,res){
        res.render('usuarioFeed');
    },

    conexoes(req, res){
        res.render('usuarioConexoes')
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