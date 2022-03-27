// puxa a classe user do model e exporta para o controller. Além do mais, gera um método para a página de perfil, no mecanismo de busca.

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

  putSerieFavorite: (tvShow, userSession) => {
    const serieFavorite = {
      id: tvShow.id,
      original_name: tvShow.original_name,
      poster_path: tvShow.poster_path,
      first_air_date: tvShow.first_air_date
    };

    const index = db.users.findIndex(user => user.id == userSession.id);

    db.users[index].castFavorites.push(serieFavorite);
    const json = JSON.stringify(db);
    fs.writeFileSync( 'src/database/db.json', json);
    console.log("MODEL - Série adicionada aos Favoritos!");
    return "Série adicionada aos Favoritos!";    
  },

  removeSerieFavorite: (tvShowId, userSession) => {
    const index = db.users.findIndex(user => user.id == userSession.id);
    const indexTvShowFavorite = db.users[index].castFavorites.findIndex(serieFavorite => serieFavorite.id == tvShowId);

    db.users[index].castFavorites.splice(indexTvShowFavorite, 1);
    const json = JSON.stringify(db);
    fs.writeFileSync('src/database/db.json', json);
    console.log('MODEL - Série removida dos favoritos!');
    return "Série removida dos Favoritos!";
  },

  putSerieToCast: (tvShow, userSession) => {
    const genresTvShow = tvShow.genres;
    
    const serieToCast = {
      id: tvShow.id,
      original_name: tvShow.original_name,
      poster_path: tvShow.poster_path,
      first_air_date: tvShow.first_air_date,
      episode_run_time: tvShow.episode_run_time[0],
      episodes: []
    };

    const index = db.users.findIndex(user => user.id == userSession.id);

    genresTvShow.forEach(({}, indexB) =>{
      let indexGenre = db.users[index].genresTvShows.findIndex(genre => genre.id == genresTvShow[indexB].id);
      if(indexGenre == -1){
        db.users[index].genresTvShows.push({
          id: genresTvShow[indexB].id,
          name: genresTvShow[indexB].name
        });
      }
    });

    db.users[index].castTvShows.push(serieToCast)
    const json = JSON.stringify(db);
    fs.writeFileSync( 'src/database/db.json', json);
    console.log("MODEL - Série adicionada!");
    return "Série adicionada!";
  },

  removeTvShowFromCast: (tvShowId, userSession) => {
    const index = db.users.findIndex(user => user.id == userSession.id);
    const tvShowIndex = db.users[index].castTvShows.findIndex(serie => serie.id == tvShowId);

    db.users[index].castTvShows.splice(tvShowIndex, 1);
    const json = JSON.stringify(db);
    fs.writeFileSync( 'src/database/db.json', json);
    console.log('MODEL - Série removida do cast!');
    return "Série removida do cast!";
  },


  addEpisode: (tvShow,season, episode_number, episode_id, userSession) => {
    const index = db.users.findIndex(user => user.id == userSession.id);
    const tvShowIndex = db.users[index].castTvShows.findIndex(serie => serie.id == tvShow.id);
    
    if(tvShowIndex != -1){
      const episodeIsWatched = db.users[index].castTvShows[tvShowIndex].episodes.findIndex(episode => episode.episode_id == episode_id);
      if(episodeIsWatched == -1){
        const episode = {
          episode_id: episode_id,
          season: season,
          episode_number: episode_number
        }
        db.users[index].castTvShows[tvShowIndex].episodes.push(episode);
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

  removeEpisode: (tvShowId, season, episode_number, episode_id, userSession) => {
    const index = db.users.findIndex(user => user.id == userSession.id);
    const tvShowIndex = db.users[index].castTvShows.findIndex(serie => serie.id == tvShowId);
    const episodeIndex = db.users[index].castTvShows[tvShowIndex].episodes.findIndex(episode => episode.episode_id == episode_id);
    
    db.users[index].castTvShows[tvShowIndex].episodes.splice(episodeIndex, 1);
    const json = JSON.stringify(db);
    fs.writeFileSync( 'src/database/db.json', json);
    console.log('MODEL - Episódio removido!');
    return "Episódio removido!";
  },

  getTimekeeperAndEpisodes: (castTvShows) => {
    let timekeeper = 0;
    let episodes = 0;
    
    castTvShows.forEach(({}, index) => {
      episodes = episodes + castTvShows[index].episodes.length;
      timekeeper = timekeeper + (castTvShows[index].episodes.length * castTvShows[index].episode_run_time);
    });

    episodes = parseInt(episodes);
    timekeeper = parseInt(timekeeper);

    console.log('MODEL - Coletou ' + episodes + ' episódios e ' + timekeeper + ' minutos!');
    return { episodes, timekeeper };
  },
  
  filterByName: (searchTerm) => {
    const users = this.getUsers();
    return users.filter(n => n.name.includes(searchTerm));
  }
};

module.exports = User;