'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Episode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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