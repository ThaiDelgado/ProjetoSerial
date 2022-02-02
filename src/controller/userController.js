//Criar cadastro usuário

const user = require('../model/user');

module.exports = {

    index(req,res){
        res.render('usuarioPerfil');
    },
    
    //criar função para coletar as séries favoritas do usuário
    //criar no ejs uma função para percorrer o array do objeto e gerar as imagens
};