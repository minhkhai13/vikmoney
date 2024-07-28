'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenVikmoney extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TokenVikmoney.init({
    token: DataTypes.STRING,
    type: DataTypes.STRING,
    expires: DataTypes.STRING,
    user_id: DataTypes.STRING,
    blacklisted: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'TokenVikmoney',
  });
  return TokenVikmoney;
};