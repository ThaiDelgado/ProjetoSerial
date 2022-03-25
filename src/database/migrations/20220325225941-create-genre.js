'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Genres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idGenre: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_user_genre: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName: 'users'
          }, 
          key: 'id' 
        }
      },
      id_tvshow_genre: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName:'castTvShows'
          }, 
          key: 'id' 
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Genres');
  }
};