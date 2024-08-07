"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GoogleDirect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GoogleDirect.belongsTo(models.Campaign, { foreignKey: "campaign_id" });
    }
  }
  GoogleDirect.init(
    {
      campaign_id: DataTypes.INTEGER,
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
      modelName: "GoogleDirect",
    }
  );
  return GoogleDirect;
};