// puxa a classe user do model e exporta para o controller. Além do mais, gera um método para a página de perfil, no mecanismo de busca.
const db = require('../database/db.json');
const fs = require('fs');
const path = require('path');

const User = {
  getUser: (emailReq) => {
    const user = db.users.find(user => user.email === emailReq);
    return user;
  },

  getUserById: (idUser) => {
    const user = db.users.find(user => user.id === idUser);
    return user;
  },
  
  createUser:(newUser) => {
      const userExists = db.users.findIndex(user => user.email == newUser.email);
      
      if(userExists == -1){
        db.users.push(newUser);
        const json  = JSON.stringify(db);
        fs.writeFileSync('src/database/db.json', json);
        console.log("MODEL - Usuário cadastrado com sucesso!");
        return "Usuário cadastrado com sucesso!"
      } 
      return "Usuário existente!"    
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
      console.log("MODEL - Usuário Inexistente!");
      return "Usuário Inexistente!";
    } else {
      db.users[index].castFavoritos.push(serieFavorite);
      const json = JSON.stringify(db);
      fs.writeFileSync( 'src/database/db.json', json);
      console.log("MODEL - Série adicionada aos Favoritos!");
      return "Série adicionada aos Favoritos!";
    };    
  },

  addEpisode: async (tvShow,season, episode_number, episode_id) => {
    const index = db.users.findIndex(user => user.id == 1);
    const tvShowIndex = db.users[index].castTvShows.findIndex(serie => serie.id = tvShow.id);
    
    if(tvShowIndex != -1){
      const episodeIsWatched = db.users[index].castTvShows[tvShowIndex].episodes.findIndex(episode => episode.episode_id == episode_id);
      if(episodeIsWatched == -1){
        const timekeeper = db.users[index].timekeeper + tvShow.episode_run_time[0];
        const episodes = db.users[index].episodes + 1;
        const episode = {
          episode_id: episode_id,
          season: season,
          episode_number: episode_number
        }
        db.users[index].castTvShows[tvShowIndex].episodes.push(episode);
        db.users[index].timekeeper = timekeeper;
        db.users[index].episodes = episodes;
        const json = JSON.stringify(db);
        fs.writeFileSync( 'src/database/db.json', json);
        console.log("MODEL - Episódio adicionado com sucesso!");
        return "Episódio adicionado!";
      } else {
        console.log("MODEL - Episódio já marcado como assistido!");
        return "Episódio já marcado como assistido!";
      }
    }
    console.log("MODEL - Adicione o episódio após inserir a série ao Cast!");
    return "Adicione o episódio após inserir a série ao Cast!";
  },

  removeEpisode: async(tvShow, season, episode_number, episode_id) => {
    const index = db.users.findIndex(user => user.id == 1);
    const tvShowIndex = db.users[index].castTvShows.findIndex(serie => serie.id = tvShow.id);
    const episodeIndex = db.users[index].castTvShows[tvShowIndex].episodes.findIndex(episode => episode.episode_id == episode_id);
    const timekeeper = db.users[index].timekeeper - tvShow.episode_run_time[0];
    const episodes = db.users[index].episodes - 1;
    
    db.users[index].castTvShows[tvShowIndex].episodes.splice(episodeIndex, 1);
    db.users[index].episodes = episodes;
    db.users[index].timekeeper = timekeeper;
    const json = JSON.stringify(db);
    fs.writeFileSync( 'src/database/db.json', json);
    console.log('MODEL - Episódio removido!');
    return "Episódio removido!";
  },

  putSerieToCast: async (tvShow) => {
    const index = db.users.findIndex(user => user.id == 1);
    const genresTvShow = tvShow.genres;
    
    let serieToCast = {
      id: tvShow.id,
      original_name: tvShow.original_name,
      poster_path: tvShow.poster_path,
      first_air_date: tvShow.first_air_date,
      episodes: []
    };


    if(index == -1){
      console.log('MODEL - Usuário Inexistente!');
      return "Usuário Inexistente!";
    } else {
      genresTvShow.forEach(({}, index) =>{
        let indexGenre = db.users[index].genresTvShows.findIndex(genre => genre.id == genresTvShow[index].id);
        if(indexGenre == -1){
          db.users[index].genresTvShows.push({
            "id": genresTvShow[index].id,
            "name": genresTvShow[index].name
          });
        }
      });
      db.users[index].castTvShows.push(serieToCast)
      const json = JSON.stringify(db);
      fs.writeFileSync( 'src/database/db.json', json);
      console.log("MODEL - Série adicionada!");
      return "Série adicionada!";
    };
  },
  
  filterByName: (searchTerm) => {
    const users = this.getUsers()
    return users.filter(n => n.name.includes(searchTerm))
  }
};

module.exports = User;