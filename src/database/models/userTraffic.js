'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTraffic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserTraffic.init({
    full_name: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    accept_token: DataTypes.TEXT,
    refesh_token: DataTypes.TEXT,
    role: DataTypes.STRING,
    birthday: DataTypes.STRING,
    sex: DataTypes.BOOLEAN,
    location: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    avatar: DataTypes.TEXT,
    active: DataTypes.BOOLEAN,
    money: DataTypes.INTEGER,
    infor_detail: DataTypes.STRING,
    type_account: DataTypes.STRING,
    dark_mode: DataTypes.STRING,
    laguage: DataTypes.BOOLEAN,
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserTraffic',
  });
  return UserTraffic;
};