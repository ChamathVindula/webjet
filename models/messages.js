'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Messages.belongsTo(models.Connections);
      models.Messages.belongsTo(models.GoogleUsers)
    }
  };
  Messages.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    from: {
      allowNull: false,
      type: DataTypes.STRING,
       references: {
         model: 'GoogleUsers',
         key: 'id'
       }
    },
    to: {
      allowNull: false,
      type: DataTypes.STRING,
      references: { 
        model: 'GoogleUsers',
        key: 'id'
      }
    },
    connectionId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Connections',
        key: 'id'
      }
    },
    message: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};