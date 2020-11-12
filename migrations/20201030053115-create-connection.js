'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Connections', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userLeft: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'GoogleUsers',
          key: 'id'
        }
      },
      userRight: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'GoogleUsers',
          key: 'id'
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true
        }
      },
      lastActive: {
        allowNull: true,
        type: Sequelize.DATE
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Connections');
  }
};