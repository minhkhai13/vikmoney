"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Campaign.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      domain_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      level: DataTypes.STRING,
      total_view: DataTypes.INTEGER,
      day_view: DataTypes.INTEGER,
      total_viewed: DataTypes.INTEGER,
      day_viewed: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      progress: DataTypes.STRING,
      detail_info: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Campaign",
    }
  );
  return Campaign;
};
