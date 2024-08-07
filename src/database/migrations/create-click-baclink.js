"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ClickBacklinks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      campaign_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      anchor_text_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      url_backlink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      action: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      total_view: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      day_view: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      total_viewed: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      day_viewed: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      time_min: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      time_max: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      progress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      detail_info: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
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
    await queryInterface.dropTable("ClickBacklinks");
  },
};
