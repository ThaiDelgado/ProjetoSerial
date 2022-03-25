const { User } = require('./models');

User.create({
    name: 'Humberto Galdino' , 
    email: 'humberto.galdino@live.com', 
    password:'$2b$10$78wyczdZCiMCloCJXM0Oze1KIx16UG.sVOMuF9AWvg4ut2g.GfQMy' , 
    imgProfile: '/images/imgUsuarioPerfil/user-profile.jpg', 
    imgBackground: '/images/imgUsuarioPerfil/background-user.jpg'
});

User.findAll().then((result) => console.log(JSON.stringify(result)));