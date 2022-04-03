'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {

    static associate(models) {
      //USER
      Genre.belongsTo(models.User, {
        as: 'user_genre',
        foreignKey: 'id_user_genre',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      })

      //TVSHOW
      Genre.belongsTo(models.castTvShow, {
        as: 'tvShow_genre',
        foreignKey: 'id_tvshow_genre',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      })
    }
  }
  Genre.init({
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
  return Genre;
};