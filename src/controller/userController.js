//Criar cadastro usuário
const User = require('../model/user');

module.exports = {

    perfil(req,res){
        const userProfile = User.getUserById(req.session.userId);
        const timekeeperAndEpisodes = User.getTimekeeperAndEpisodes(userProfile.castTvShows); 
        const timeMonths = parseInt(((timekeeperAndEpisodes.timekeeper / 60) / 24) / 30);
        const timeDays = parseInt(((timekeeperAndEpisodes.timekeeper / 60) / 24) > 30 ? ((timekeeperAndEpisodes.timekeeper / 60) / 24) % 30 : (timekeeperAndEpisodes.timekeeper / 60) / 24);
        const timeHours = parseInt((timekeeperAndEpisodes.timekeeper / 60) % 24);
        const timeMinutes = timekeeperAndEpisodes.timekeeper % 60;

        const timekeeper = {
            timeMonths: timeMonths,
            timeDays: timeDays,
            timeHours: timeHours,
            timeMinutes: timeMinutes
        }

        const episodes = timekeeperAndEpisodes.episodes;
  
        res.render('usuarioPerfil', { user: userProfile, timekeeper, episodes });       
    },

    perfilComPesquisa(req,res){
        const searchTerm = req.query["name"];
        const users = User.filterByName(searchTerm);
        res.render('usuarioPerfil', { users });
    },
    
    feed(req,res){    
        res.render('usuarioFeed', { user: req.session.user });
    },

    conexoes(req, res){    
        res.render('usuarioConexoes', {user: req.session.user});
    },
    
    pipocando(req,res){
        res.render('usuarioPipocando', {user: req.session.user});
    },

    perfilSeguir(req,res){
        res.render('usuarioSeguir');
    }
};