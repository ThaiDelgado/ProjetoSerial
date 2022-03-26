'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {  
    
    //DEFINE OS RELACIONAMENTOS
    static associate(models) {
      
      //CASTTVSHOW
      User.hasMany(models.castTvShow, {
        as:'tvShows',
        foreignKey: 'id_user_cast_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //EPISODES
      User.hasMany(models.Episode, {
        as: 'episodes',
        foreignKey: 'id_user_episodes_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //GENRES
      User.hasMany(models.Genre,{
        as: 'genres',
        foreignKey: 'id_user_genre',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //SERIESCOMMENTS
      User.hasMany(models.SeriesComment, {
        as: 'comment',
        foreignKey: 'id_user_comments_fk',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //CONNECTIONS

      //MAIN
      User.hasMany(models.Connection, {
        as: 'main_connection',
        foreignKey: 'id_main_user',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //SECONDARY
      User.hasMany(models.Connection, {
        as: 'secondary_connection',
        foreignKey: 'id_secondary_user',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }

  }

  User.init({
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgProfile: DataTypes.STRING,
    imgBackground: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    freezeTableName: true
  });

  return User;
};