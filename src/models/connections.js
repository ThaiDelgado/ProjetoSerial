'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {

    static associate(models) {

      //MAIN
      Connection.belongsTo(models.User, {
        as: 'user_main_connection',
        foreignKey: 'id_main_user',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      //SECONDARY
      Connection.belongsTo(models.User, {
        as: 'secondary_user_connection',
        foreignKey: 'id_secondary_user',
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }
  }

  Connection.init({
    id_main_user: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' }
    },
    id_secondary_user: {
      type: DataTypes.INTEGER,
      references: { model: 'User', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Connection',
    tableName: 'connections',
    freezeTableName: true
  });
  return Connection;
};