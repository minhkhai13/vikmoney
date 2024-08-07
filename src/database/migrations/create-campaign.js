"use strict";
const db = require("../models/index");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Campaigns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "UserTraffics", // Tên của bảng mà nó tham chiếu đến
          key: "id",
        },
        onUpdate: "CASCADE", // Đảm bảo cập nhật đồng bộ
        onDelete: "SET NULL", // Xử lý khi hàng tham chiếu bị xóa
      },
      domain_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "DomainTraffics", // Tên của bảng mà nó tham chiếu đến
          key: "id",
        },
        onUpdate: "CASCADE", // Đảm bảo cập nhật đồng bộ
        onDelete: "SET NULL", // Xử lý khi hàng tham chiếu bị xóa
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      level: {
        type: Sequelize.STRING,
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
      isPause: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      progress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      detail_info: {
        type: Sequelize.TEXT,
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

    // Thêm ràng buộc duy nhất cho cặp user_id và name
    await queryInterface.addConstraint("Campaigns", {
      fields: ["user_id", "name"],
      type: "unique",
      name: "unique_user_id_name",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Campaigns");
  },
};
