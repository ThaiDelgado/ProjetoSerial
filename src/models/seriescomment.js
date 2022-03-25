'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeriesComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SeriesComment.init({
    id_tvshow_comments_fk: {
      type: DataTypes.INTEGER,
      references: { model: 'castTvShow', key: 'id' }
    },
    id_user_comments_fk: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' }
    },
    season: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'SeriesComment',
    tableName: 'seriescomments',
    freezeTableName: true
  });
  return SeriesComment;
};