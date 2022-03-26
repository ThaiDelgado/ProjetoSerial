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
        as: 'user',
        foreignKey: 'id_user_cast_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //EPISODES
      castTvShow.hasMany(models.Episode, {
        as: 'episodes',
        foreignKey: 'id_tvshow_episodes_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //GENRES
      castTvShow.hasMany(models.Genre, {
        as: 'genres',
        foreignKey: 'id_tvshow_genre',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //COMMENTS
      castTvShow.belongsTo(models.SeriesComment, {
        as: 'comment',
        foreignKey: 'id_tvshow_comments_fk',
        onDelete: 'RESTRICT',
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