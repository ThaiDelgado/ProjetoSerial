// puxa a classe user do model e exporta para o controller. Além do mais, gera um método para a página de perfil, no mecanismo de busca.

module.exports = class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  static getUsers() {
    return [{ name: 'aron'}, { name: 'ogata' }, { name: 'keppe' }, { name: 'guilherme' }]
  }
  
  static filterByName(searchTerm) {
    const users = this.getUsers()
    return users.filter(n => n.name.includes(searchTerm))
  }
}