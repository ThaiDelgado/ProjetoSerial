'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Connection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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