'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from: {
        allowNull: false,
        type: Sequelize.STRING,
         references: {
           model: 'GoogleUsers',
           key: 'id'
         }
      },
      to: {
        allowNull: false,
        type: Sequelize.STRING,
        references: { 
          model: 'GoogleUsers',
          key: 'id'
        }
      },
      connectionId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Connections',
          key: 'id'
        }
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};