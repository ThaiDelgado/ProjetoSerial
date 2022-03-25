'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Genres.init({
    idGenre: DataTypes.INTEGER,
    id_user_genre: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' }
    },
    id_tvshow_genre: {
      type: DataTypes.INTEGER,
      references: { model: 'castTvShow', key: 'id' }
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genre',
    tableName: 'genres',
    freezeTableName: true
  });
  return Genres;
};