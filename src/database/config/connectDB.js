const Sequelize = require("sequelize");

const config = require("../../config/config");

const init = () => {
  return new Sequelize(
    config.database.databaseName,
    config.database.username,
    config.database.password,
    {
      host: config.database.host,
      dialect: "postgres",
      logging: config.database.enableSqlLogging ? console.log : false,
      pool: {
        max: Number(config.database.maxConnection),
        min: Number(config.database.minConnection),
        acquire: 120000,
        idle: 60000,
      },
    }
  );
};

module.exports = init;
