"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
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
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accept_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      refesh_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "user",
      },
      birthday: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sex: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mail_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      money: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      infor_detail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      facebookId: {
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
    await queryInterface.dropTable("Users");
  },
};
