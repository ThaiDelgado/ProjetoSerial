// puxa a classe user do model e exporta para o controller. Além do mais, gera um método para a página de perfil, no mecanismo de busca.
const db = require('../database/db.json');
const fs = require('fs');

const User = {
  getUser: (emailReq) => {
    const user = db.users.find(user => user.email === emailReq);
    return user;
  },

  getUserById: (idUser) => {
    const user = db.users.find(user => user.id === idUser);
    return user;
  },
  createUser:(user) => {
      db.users.push(user);
      const  objetoEmString  = JSON.stringify(objeto)
        fs.writeFileSync(path.join(__dirname, '..', 'database', 'db.json'),objetoEmString);
  },
   

  putSerieFavorite: async (favorite) => {
    const index = db.users.findIndex(user => user.id == 1);
    
    let serieFavorite = {
      id: favorite.id,
      original_name: favorite.original_name,
      poster_path: favorite.poster_path,
      first_air_date: favorite.first_air_date
    };

    if(index == -1){
      console.log("Usuário Inexistente!");
      return "Usuário Inexistente!";
    } else {
      db.users[index].castFavoritos.push(serieFavorite);
      const json = JSON.stringify(db);
      fs.writeFileSync( 'src/database/db.json', json);
      console.log("Série adicionada aos Favoritos!");
      return "Série adicionada aos Favoritos!";
    };    
  },

  addEpisode: async (tvShow, episode_number) => {
    const index = db.users.findIndex(user => user.id == 1);
    const tvShowIndex = db.users[index].castTvShows.findIndex();

    if(tvShowIndex != -1){
      let timekepper = db.users[index].timekepper + tvShow.episode_run_time[0];
      db.users[index].castTvShows[tvShowIndex].episodes.push(episode_number);
      db.users[index].timekepper = timekepper;
      const json = JSON.stringify(db);
      fs.writeFileSync( 'src/database/db.json', json);
      return "Episódio adicionado!";
    }

    return "Adicione o episódio após inserir ele ao Cast!";
  },

  putSerieToCast: async (tvShow) => {
    const index = db.users.findIndex(user => user.id == 1);
    
    let serieToCast = {
      id: tvShow.id,
      original_name: tvShow.original_name,
      poster_path: tvShow.poster_path,
      first_air_date: tvShow.first_air_date
    };


    if(index == -1){
      console.log("Usuário Inexistente!");
      return "Usuário Inexistente!";
    } else {
      db.users[index].castTvShows.push(serieToCast)
      const json = JSON.stringify(db);
      fs.writeFileSync( 'src/database/db.json', json);
      console.log("Série adicionada!");
      return "Série adicionada!";
    };
  },
  
  filterByName: (searchTerm) => {
    const users = this.getUsers()
    return users.filter(n => n.name.includes(searchTerm))
  }
};

module.exports = User;