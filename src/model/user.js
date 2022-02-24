// puxa a classe user do model e exporta para o controller. Além do mais, gera um método para a página de perfil, no mecanismo de busca.
const db = require('../database/db.json');
const serie = require('../model/serie');
const fs = require('fs');

const User = {
  getUser: (emailReq) => {
    const user = db.users.find(user => user.email === emailReq);
    return user;
  },

  putSerieFavorite: async (id) => {
    let favorite = await serie.findByID(id);
    const index = db.users.findIndex(user => user.id == 1);
    
    let serieFavorite = {
      id: favorite.id,
      original_name: favorite.original_name,
      poster_path: favorite.poster_path,
      first_air_date: favorite.first_air_date
    };
    console.log(serieFavorite);

    if(index == -1){
      console.log("Usuário Inexistente!");
      return "Usuário Inexistente!";
    } else {
      db.users[index].castFavoritos.push(serieFavorite)
      const json = JSON.stringify(db);
      fs.writeFileSync( 'src/database/db.json', json);
      console.log("Série adicionada aos Favoritos!");
      return "Série adicionada aos Favoritos!";
    };    
  },
  
  filterByName: (searchTerm) => {
    const users = this.getUsers()
    return users.filter(n => n.name.includes(searchTerm))
  }
}

module.exports = User;