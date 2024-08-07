"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LimitIpForDomain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      LimitIpForDomain.belongsTo(models.UserTraffic, { foreignKey: "user_id" });
      LimitIpForDomain.belongsTo(models.DomainTraffic, { foreignKey: "domain_id" });
    }
  }
  LimitIpForDomain.init(
    {
      user_id: DataTypes.INTEGER,
      domain_id: DataTypes.INTEGER,
      task_id: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      assigned_ip: DataTypes.STRING,
      assigned_at: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LimitIpForDomain",
    }
  );
  return LimitIpForDomain;
};
