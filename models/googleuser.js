'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoogleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.GoogleUsers.hasMany(models.Connections);
      models.GoogleUsers.hasMany(models.Messages);
      // define association here
    }
  };
  GoogleUser.init({
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    photo: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        isUrl: true
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
    modelName: 'GoogleUsers',
  });
  return GoogleUser;
};