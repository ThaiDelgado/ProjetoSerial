'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Connections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_main_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName: 'users'
          }, 
          key: 'id' 
        }
      },
      id_secondary_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName: 'users'
          }, 
          key: 'id' 
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Connections');
  }
};