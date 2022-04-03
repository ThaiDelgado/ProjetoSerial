'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeriesComment extends Model {

    static associate(models) {
      //USER
      SeriesComment.belongsTo(models.User, {
        as: 'user_comment',
        foreignKey: 'id_user_comments_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

    }
  }
  
  SeriesComment.init({
    id_user_comments_fk: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' }
    },
    idTvShow: DataTypes.INTEGER,
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