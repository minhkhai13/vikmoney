'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    accept_token: DataTypes.STRING,
    refesh_token: DataTypes.STRING,
    role: DataTypes.STRING,
    birthday: DataTypes.STRING,
    sex: DataTypes.BOOLEAN,
    location: DataTypes.STRING,
    mail_active: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    money: DataTypes.INTEGER,
    infor_detail: DataTypes.STRING,
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};