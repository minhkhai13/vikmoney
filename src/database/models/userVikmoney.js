'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserVikmoney extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserVikmoney.init({
    full_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    facebook: DataTypes.STRING,
    password: DataTypes.STRING,
    refesh_token: DataTypes.TEXT,
    accept_token: DataTypes.TEXT,
    role: DataTypes.STRING,
    type: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    avatar: DataTypes.TEXT,
    money: DataTypes.INTEGER,
    id_parent: DataTypes.STRING,
    code_referral: DataTypes.TEXT,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserVikmoney',
  });
  return UserVikmoney;
};