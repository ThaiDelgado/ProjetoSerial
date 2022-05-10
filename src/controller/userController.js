//Criar cadastro usuário
const { User } = require('../models');
const { castTvShow } = require('../models');
const { Episode } = require('../models');
const { Genre } = require('../models');
const { Connection } = require('../models');
const { Op } = require('sequelize');
const { Result } = require('express-validator');


module.exports = {

    async perfil(req, res) {
        const userProfile = await User.findOne({
            raw: true,
            where: {
                id: req.params.id
            }
        })

        const times = await Episode.sum('tvShow_episode.episode_run_time', {
            include: 'tvShow_episode',
            where: {
                id_user_episodes_fk: req.params.id
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
                id_user_episodes_fk: req.params.id
            }
        });

        const favoritesCast = await castTvShow.findAll({
            include: 'user_tvShow',
            where: {
                id_user_cast_fk: req.params.id,
                isFavorite: 1
            }
        });

        const cast = await castTvShow.findAll({
            include: 'user_tvShow',
            where: {
                id_user_cast_fk: req.params.id
            }
        });

        let genres = await Genre.findAll({
            raw: true,
            where: {
                id_user_genre: req.params.id
            }
        })

        genres.forEach(genre => {
            delete genre.id;
            delete genre.id_tvshow_genre;
            delete genre.createdAt;
            delete genre.updatedAt;
        });

        const uniqueGenres = new Map();

        genres.forEach(genre => {
            if (!uniqueGenres.has(genre.name)) {
                uniqueGenres.set(genre.name, genre);
            }
        });

        genres = [...uniqueGenres.values()];

        const isFollowing = (await Connection.findOne({
            where: {
                id_main_user: req.session.user.id,
                id_secondary_user: req.params.id
            }
        })) === null ? false : true;

        const followers = await Connection.count({
            where: {
                id_secondary_user: req.session.user.id
            }
        });

        const following = await Connection.count({
            where: {
                id_main_user: req.session.user.id
            }
        });

        res.render('usuarioPerfil', { user: userProfile, userSession: req.session.user, followers, following, timekeeper, episodes, favoritesCast, cast, genres, isFollowing });
    },

    async search(req, res) {
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

        res.render('SearchUsers', { userSession: req.session.user, users });
    },

    async feed(req, res) {

        const userProfile = await User.findOne({
            raw: true,
            where: {
                id: req.params.id
            }
        })

        const following = await Connection.findAndCountAll({            
            where: {
                id_main_user: req.session.user.id,
            }
        });

        const followers = await Connection.count({
            where: {
                id_secondary_user: req.session.user.id,
            }
        });

        const followingIds = following.rows.map(row => row.id);

        const feed = await castTvShow.findAll({
            include: [{
                as: 'user_tvShow',
                model: User,
                [Op.in]: {
                    id_user_cast_fk: followingIds
                }
            }],
            where:{
                [Op.not]: {
                    id_user_cast_fk: userProfile.id
                }
            },
            limit: 10,
            order: [['createdAt', 'DESC']]
        });

        console.log(feed);

        res.render('usuarioFeed', { user: userProfile, userSession: req.session.user, following: following.count, followers });
    },

    async conexoes(req, res) {
        const userProfile = await User.findOne({
            raw: true,
            where: {
                id: req.params.id
            }
        });

        const userFollowing = await Connection.findAll({
            include: "secondary_user_connection",
            where: {
                id_main_user: req.params.id
            }
        });

        const userFollowers = await Connection.findAll({
            include: "user_main_connection",
            where: {
                id_secondary_user: req.params.id
            }
        });

        const isFollowing = (await Connection.findOne({
            where: {
                id_main_user: req.session.user.id,
                id_secondary_user: req.params.id
            }
        })) === null ? false : true;

        const followers = await Connection.count({
            where: {
                id_main_user: req.session.user.id,
            }
        });

        const following = await Connection.count({
            where: {
                id_secondary_user: req.session.user.id,
            }
        });

        res.render('usuarioConexoes', { user: userProfile, userSession: req.session.user, followers, following, userFollowing, userFollowers, isFollowing });
    },

    async pipocando(req, res) {
        const userProfile = await User.findOne({
            raw: true,
            where: {
                id: req.params.id
            }
        })

        const followers = await Connection.count({
            where: {
                id_main_user: req.session.user.id,
            }
        });

        const following = await Connection.count({
            where: {
                id_secondary_user: req.session.user.id,
            }
        });

        res.render('usuarioPipocando', { user: userProfile, userSession: req.session.user, isFollowing: false, followers, following });
    },

    async follow(req, res) {
        const idMainUser = req.session.user.id;
        const idSecondaryUser = req.params.id;
        const usernameSecondaryUser = req.params.nomeUsuario;

        await Connection.create({
            id_main_user: idMainUser,
            id_secondary_user: idSecondaryUser
        });

        return res.redirect(`/usuario/${usernameSecondaryUser}/${idSecondaryUser}`);
    },

    async settings(req, res) {

        const userProfile = await User.findOne({
            raw: true,
            where: {
                id: req.params.id
            }
        })

        const followers = await Connection.count({
            where: {
                id_main_user: req.session.user.id,
            }
        });

        const following = await Connection.count({
            where: {
                id_secondary_user: req.session.user.id,
            }
        });
        res.render('settings', { user: userProfile, userSession: req.session.user, following, followers });
    },

    async imgProfile(req, res) {

        await User.update({
            imgProfile: `/images/uploads/${req.file.filename}`
        }, {
            where: {
                id: req.session.user.id
            }
        });

        res.redirect(`/usuario/${req.session.user.username}/${req.session.user.id}/settings`);
    },

    async imgBackground(req, res) {

        await User.update({
            imgBackground: `/images/uploads/${req.file.filename}`
        }, {
            where: {
                id: req.session.user.id
            }
        });

        res.redirect(`/usuario/${req.session.user.username}/${req.session.user.id}/settings`);
    }

};