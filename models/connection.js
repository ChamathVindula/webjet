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
      models.Connections.belongsTo(models.GoogleUsers);
      models.Connections.hasMany(models.Messages);
    }
  };
  Connection.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    userLeft: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'GoogleUsers',
        key: 'id'
      }
    },
    userRight: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'GoogleUsers',
        key: 'id'
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    lastActive: {
      allowNull: true,
      type: DataTypes.DATE
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
    modelName: 'Connections',
  });
  return Connection;
};