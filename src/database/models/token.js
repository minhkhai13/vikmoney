'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Token.init({
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    expires: DataTypes.STRING,
    user_id: DataTypes.STRING,
    blacklisted: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};