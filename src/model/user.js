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
  
  static filterByName(searchTerm) {
    const users = this.getUsers()
    return users.filter(n => n.name.includes(searchTerm))
  }
}