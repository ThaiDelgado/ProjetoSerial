//Criar cadastro usuário
const User = require('../model/user');

module.exports = {

    perfil(req,res){
        const email = "humberto.galdino@live.com";
        let userProfile = User.getUser(email); 
        let timeMonths = parseInt(((userProfile.timekeeper / 60) / 24) / 30);
        let timeDays = parseInt(((userProfile.timekeeper / 60) / 24) > 30 ? ((userProfile.timekeeper / 60) / 24) % 30 : (userProfile.timekeeper / 60) / 24);
        let timeHours = parseInt((userProfile.timekeeper / 60) % 24);
        let timeMinutes = userProfile.timekeeper % 60;

        const timekeeper = {
            timeMonths: timeMonths,
            timeDays: timeDays,
            timeHours: timeHours,
            timeMinutes: timeMinutes
        }
  
        if(userProfile){
            res.render('usuarioPerfil', { userProfile, timekeeper });
        }else{
            res.send('Usuário Inexistente!');
        };        
    },

    perfilComPesquisa(req,res){
        const searchTerm = req.query["name"];
        const users = User.filterByName(searchTerm);
        res.render('usuarioPerfil', { users });
    },
    
    feed(req,res){
        const email = "humberto.galdino@live.com";
        let userProfile = User.getUser(email);     
        if(userProfile){
            res.render('usuarioFeed', {userProfile});
        }else{
            res.send('Usuário Inexistente!');
        }; 
    },

    conexoes(req, res){
        const email = "humberto.galdino@live.com";
        let userProfile = User.getUser(email);     
        if(userProfile){
            res.render('usuarioConexoes', {userProfile});
        }else{
            res.send('Usuário Inexistente!');
        };
    },
    
    pipocando(req,res){
        const email = "humberto.galdino@live.com";
        let userProfile = User.getUser(email);     
        if(userProfile){
            res.render('usuarioPipocando', {userProfile});
        }else{
            res.send('Usuário Inexistente!');
        };
    },

    perfilSeguir(req,res){
        res.render('usuarioSeguir');
    }
    
    //criar função para coletar as séries favoritas do usuário
    //criar no ejs uma função para percorrer o array do objeto e gerar as imagens
};