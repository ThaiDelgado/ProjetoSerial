'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {

    static associate(models) {
      //USER
      Episode.belongsTo(models.User, {
        as: 'user_episode',
        foreignKey: 'id_user_episodes_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      })

      //CASTTVSHOW
      Episode.belongsTo(models.castTvShow, {
        as: 'tvShow_episode',
        foreignKey: 'id_tvshow_episodes_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      })
    }
  }
  Episode.init({
    idEpisodes: DataTypes.INTEGER,
    id_tvshow_episodes_fk: {
      type: DataTypes.INTEGER,
      references: { model: 'castTvShow', key: 'id' }
    },
    id_user_episodes_fk: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' }
    },
    idTvShow: DataTypes.INTEGER,
    season: DataTypes.INTEGER,
    episode_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Episode',
    tableName: 'episodes',
    freezeTableName: true
  });
  return Episode;
};