//Criar cadastro usuário
const { User } = require('../models');
const { castTvShow } = require('../models');
const { Episode } = require('../models');
const { Genre } = require('../models');
const { Op } = require('sequelize');
const { Result } = require('express-validator');

module.exports = {

    async perfil(req,res){
        const userProfile = await User.findOne({
            raw: true,
            where:{
                id: req.session.userId
            }
        })

        console.log(userProfile.imgProfile);
        console.log(userProfile.imgBackground);

        const times = await Episode.sum('tvShow_episode.episode_run_time',{
            include: 'tvShow_episode',
            where:{
                id_user_episodes_fk: req.session.userId
            }
        });

        const timeMonths = parseInt(((times / 60) / 24) / 30);
        const timeDays = parseInt(((times / 60) / 24) > 30 ? ((times / 60) / 24) % 30 : (times / 60) / 24);
        const timeHours = parseInt((times / 60) % 24);
        const timeMinutes = times % 60;

        const timekeeper = {
            timeMonths: timeMonths,
            timeDays: timeDays,
            timeHours: timeHours,
            timeMinutes: timeMinutes
        }

        const episodes = await Episode.count({
            where: {
                id_user_episodes_fk: req.session.userId
            }
        });

        const favoritesCast = await castTvShow.findAll({
            include:'user_tvShow',
            where:{
                id_user_cast_fk: req.session.userId,
                isFavorite: 1
            }
        });

        const cast = await castTvShow.findAll({
            include:'user_tvShow',
            where:{
                id_user_cast_fk: req.session.userId
            }
        });

        const genres = await Genre.findAll({
            raw: true,
            where: {
                id_user_genre: req.session.userId
            }
        })
  
        res.render('usuarioPerfil', { user: userProfile, timekeeper, episodes, favoritesCast, cast, genres });       
    },

    async search(req,res){
        const searchTerm = req.query.txtBusca;
        console.log(searchTerm);
        const users = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });
        console.log(users);
        
        res.render('SearchUsers', { users });
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
    }, 
    multer(req, res){
        res.render('multer');
    }
};