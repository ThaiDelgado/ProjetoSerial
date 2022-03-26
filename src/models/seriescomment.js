'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeriesComment extends Model {

    static associate(models) {
      //USER
      SeriesComment.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'id_user_comments_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //CASTTVSHOW
      SeriesComment.belongsTo(models.castTvShow, {
        as: 'tvShow',
        foreignKey: 'id_tvshow_comments_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
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