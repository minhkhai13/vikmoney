"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HistoryActiveTraffic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HistoryActiveTraffic.init(
    {
      user_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      info: DataTypes.TEXT,
      device: DataTypes.STRING,
      ip: DataTypes.STRING,
      volatility: DataTypes.INTEGER,
      status_code:DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "HistoryActiveTraffic",
    }
  );
  return HistoryActiveTraffic;
};
