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
        });

        const cast = await Episode.findAndCountAll({
            include: [
                {
                    as: 'tvShow_episode', 
                    model: castTvShow
                }
            ],
            where: {
                id_user_episodes_fk: req.params.id,
                isNext: false
            }
        });

        let times = 0;
        
        cast.rows.forEach(episode => {
            times += episode.tvShow_episode.episode_run_time;
        })

        const episodes = cast.count;

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

        const uniqueCast = new Map();

        cast.rows.forEach(tvShow => {
            if (!uniqueCast.has(tvShow.idTvShow)) {
                uniqueCast.set(tvShow.idTvShow, tvShow);
            }
        });

        const casting = [...uniqueCast.values()];

        const favoritesCast = casting.filter(tvShow => tvShow.tvShow_episode.isFavorite);

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
                id_secondary_user: req.params.id
            }
        });

        const following = await Connection.count({
            where: {
                id_main_user: req.params.id
            }
        });

        res.render('usuarioPerfil', { user: userProfile, userSession: req.session.user, followers, following, timekeeper, episodes, favoritesCast, cast: casting, genres, isFollowing });
    },

    async search(req, res) {
        const searchTerm = req.query.txtBusca;
        const users = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });

        res.render('SearchUsers', { userSession: req.session.user, users });
    },

    async feed(req, res) {

        const page = parseInt(req.params.page);
        const limit = 20;
        const offset = (page - 1) * limit;

        const userProfile = await User.findOne({
            raw: true,
            where: {
                id: req.params.id
            }
        })

        const following = await Connection.findAndCountAll({            
            where: {
                id_main_user: req.session.user.id
            }
        });

        const followers = await Connection.count({
            where: {
                id_secondary_user: req.session.user.id
            }
        });

        const followingIds = following.rows.map(row => row.id);

        let feed = undefined;

        if(followingIds.length != 0) {
            feed = await castTvShow.findAndCountAll({
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
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });
        }

        const count = feed ? feed.count : 0;

        const nextPage = offset + limit < count;

        res.render('usuarioFeed', { user: userProfile, userSession: req.session.user, following: following.count, feed: feed ? feed.rows : [], followers, nextPage, page });
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
                id_secondary_user: req.session.user.id,
            }            
        });

        const following = await Connection.count({
            where: {
                id_main_user: req.session.user.id,
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
                id_secondary_user: req.session.user.id,
            }
        });

        const following = await Connection.count({
            where: {
                id_main_user: req.session.user.id,
            }
        });

        const episodesToWatch = await Episode.findAll({
            include: [
                {
                    as: 'tvShow_episode', 
                    model: castTvShow
                }
            ],
            where: {
                id_user_episodes_fk: req.params.id,
                isNext: true
            }
        });

        res.render('usuarioPipocando', { user: userProfile, userSession: req.session.user, isFollowing: false, followers, following, episodesToWatch});
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

    async unfollow(req, res) {
        const idMainUser = req.session.user.id;
        const idSecondaryUser = req.params.id;
        const usernameSecondaryUser = req.params.nomeUsuario;

        await Connection.destroy({
            where:{
                id_main_user: idMainUser,
                id_secondary_user: idSecondaryUser
            }
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
                id_secondary_user: req.session.user.id,
            }
        });

        const following = await Connection.count({
            where: {
                id_main_user: req.session.user.id,
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