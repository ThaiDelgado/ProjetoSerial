'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Episodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idEpisodes: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_tvshow_episodes_fk: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName:'castTvShows'
          }, 
          key: 'id' 
        }
      },
      id_user_episodes_fk: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { 
          model: {
            tableName: 'users'
          }, 
          key: 'id' 
        }
      },
      idTvShow: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      season: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      episode_number: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Episodes');
  }
};