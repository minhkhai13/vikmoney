"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GoogleSearch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GoogleSearch.belongsTo(models.Campaign, { foreignKey: "campaign_id" });
    }
  }
  GoogleSearch.init(
    {
      campaign_id: DataTypes.INTEGER,
      keyword: DataTypes.STRING,
      url: DataTypes.STRING,
      level: DataTypes.STRING,
      action: DataTypes.JSONB,
      total_view: DataTypes.INTEGER,
      day_view: DataTypes.INTEGER,
      total_viewed: DataTypes.INTEGER,
      day_viewed: DataTypes.INTEGER,
      time_min: DataTypes.INTEGER,
      time_max: DataTypes.INTEGER,
      detail_info: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "GoogleSearch",
    }
  );
  return GoogleSearch;
};