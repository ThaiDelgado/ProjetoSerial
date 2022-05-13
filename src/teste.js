const { User } = require('./models');
const { Genre } = require('./models');
const { Episode } = require('./models');
const { Connection } = require('./models');
const { castTvShow } = require('./models');
const { SeriesComment } = require('./models');

// User.create({
//     name: 'Humberto Galdino' , 
//     email: 'humberto.galdino@live.com', 
//     password:'$2b$10$78wyczdZCiMCloCJXM0Oze1KIx16UG.sVOMuF9AWvg4ut2g.GfQMy' , 
//     imgProfile: '/images/imgUsuarioPerfil/user-profile.jpg', 
//     imgBackground: '/images/imgUsuarioPerfil/background-user.jpg'
// });

// User.findAll({
//     raw:true,
//     where:{
//         id: 2
//     }
// })
//     .then(console.log);
//     // .then((result) => console.log(JSON.stringify(result)));

//RETORNAR UM REGISTRO
// User.findOne({
//     where: {
//         id: 2
//     }
// })
//     .then(console.log);

//LIMITADOR
// User.findAll({
//     raw:true,
//     limit:2
// })
//     .then(console.log);

// //TRAZ TODOS OS REGISTROS E CONTA QUANTOS FALTAM
// User.findAndCountAll({
//     raw:true,
//     limit:2,
//     offset: 2 //a partir do registro
// })
//     .then(console.log);

// //SISTEMA DE PÁGINAÇÃO COM FINDANDCOUNTALL
// const pagina = req.query.page || 0;
// const offset = (quantidade / 2) * pagina;

// //LIKE
// const { Op } = require('sequelize');

// User.findAndCountAll({
//     raw:true,
//     where: {
//         name: {
//             [Op.like]: '%Galdino%'
//         }
//     },
//     order:[
//         ['email', 'ASC'],
//         ['id', 'DESC']
//     ]
// })
//     .then(console.log);

//UPDATE

// User.update({
//     name: 'Humberto Galdino'
// },{
//     where: {
//         id: 2
//     }
// })

// //OUTRA FORMA DE UPDATE
// User.findOne({
//     where: {
//         id: 2
//     }
// }) 
//     .then(result => {
//         result.name = 'Humberto Galdino';
        
//         result.save();
//     })

// //DELETE
// User.destroy({
//     where:{
//         id: 4
//     }
// })
//     .then(console.log)


// castTvShow.findAll({
//     raw: true,
//     include: 'episodes_tvShow'
// })
//     .then(console.log);

// Episode.create({
//     idEpisodes: 996909,
//     id_tvshow_episodes_fk: 3,
//     id_user_episodes_fk: 2,
//     season: 1,
//     episode_number: 1
// });

// Filme.bulkCreate([
//     {
//         titulo:'Harry Potter',
//         genero: 'Fantasia'
//     },
//     {
//         titulo:'007',
//         genero: 'Ação'
//     }
// ]);


castTvShow.findAndCountAll({
    raw: true,
    include: ['episodes_tvShow', 'genres_tvShow'],
    where: {
        id_user_cast_fk: 2
    }
}).then(console.log)
