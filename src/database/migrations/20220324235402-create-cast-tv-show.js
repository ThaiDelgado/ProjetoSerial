'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('castTvShows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTvShow: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_user_cast_fk: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      original_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      overview: {
        type: Sequelize.TEXT('medium')
      },
      poster_path: {
        type: Sequelize.STRING
      },
      first_air_date:{
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      isFavorite: {
        type: Sequelize.BOOLEAN
      },
      episode_run_time: {
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
    await queryInterface.dropTable('castTvShows');
  }
};