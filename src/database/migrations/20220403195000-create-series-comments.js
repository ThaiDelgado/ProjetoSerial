'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeriesComments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user_comments_fk: {
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
      comment: {
        allowNull: false,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('SeriesComments');
  }
};