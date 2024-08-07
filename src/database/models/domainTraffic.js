"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DomainTraffic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      DomainTraffic.hasMany(models.Campaign, { foreignKey: "domain_id" });
      DomainTraffic.belongsTo(models.UserTraffic, { foreignKey: "user_id" });
    }
  }
  DomainTraffic.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      domain: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      script_id: DataTypes.STRING,
      detail_info: DataTypes.TEXT,
      deletedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "DomainTraffic",
    }
  );
  return DomainTraffic;
};
