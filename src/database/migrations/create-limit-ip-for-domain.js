"use strict";
const db = require("../models/index");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LimitIpForDomains", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      domain_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      task_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      assigned_ip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      assigned_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("LimitIpForDomains");
  },
};
