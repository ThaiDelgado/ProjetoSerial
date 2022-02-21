// puxa a classe user do model e exporta para o controller. Além do mais, gera um método para a página de perfil, no mecanismo de busca.
const { json } = require('express/lib/response');
const db = require('../database/db.json');

module.exports = class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  static getUser(emailReq) {
    const user = db.users.find(user => user.email === emailReq);
    return user;
  }

  static putSerieFavorite(serie, emailReq) {
    const index = db.users.indexOf(user => user.email === emailReq);
    let serieFavorite = {
      id: serie.id,
      original_name: serie.original_name,
      poster_path: serie.poster_path,
      first_air_date: serie.first_air_date
    };

    if(index === -1){
      return "Usuário Inexistente!"
    } else {
      db.users[index].castFavoritos.push(serieFavorite);
      return "Série adicionada aos Favoritos!"
    };    
  }
  
  static filterByName(searchTerm) {
    const users = this.getUsers()
    return users.filter(n => n.name.includes(searchTerm))
  }
}