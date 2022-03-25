'use strict';
const {
  Model
} = require('sequelize');
const User = require('./User');
module.exports = (sequelize, DataTypes) => {
  class castTvShow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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