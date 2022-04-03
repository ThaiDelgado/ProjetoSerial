'use strict';
const {
  Model
} = require('sequelize');
const User = require('./User');
module.exports = (sequelize, DataTypes) => {
  class castTvShow extends Model {

    static associate(models) {

      //USER
      castTvShow.belongsTo(models.User, {
        as: 'user_tvShow',
        foreignKey: 'id_user_cast_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //EPISODES
      castTvShow.hasMany(models.Episode, {
        as: 'episodes_tvShow',
        foreignKey: 'id_tvshow_episodes_fk',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
      });

      //GENRES
      castTvShow.hasMany(models.Genre, {
        as: 'genres_tvShow',
        foreignKey: 'id_tvshow_genre',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
      });

    }
  }

  castTvShow.init({
    idTvShow: DataTypes.INTEGER,
    id_user_cast_fk: {
      type:DataTypes.INTEGER,
      references:{
        model: User,
        key:'id'
      }
    },
    original_name: DataTypes.STRING,
    poster_path: DataTypes.STRING,
    first_air_date: DataTypes.DATEONLY,
    isFavorite: DataTypes.BOOLEAN,
    episode_run_time:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'castTvShow',
    tableName: 'castTvShows',
    freezeTableName: true
  });
  return castTvShow;
};