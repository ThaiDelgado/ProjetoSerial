//Criar cadastro usuário
const User = require('../model/user');

module.exports = {

    perfil(req,res){
        const users = ['aron', 'guilherme', 'keppe', 'ogata'];
        
        const nameToFilter = req.query["name"];

        if (!nameToFilter) return res.render('usuarioPerfil', { users })
        
        const foundUsers = users.filter(name => name.includes(nameToFilter));

        res.render('usuarioPerfil', { users: foundUsers });
    },
    
    perfil2(req,res){
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