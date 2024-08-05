"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserVikmoneys", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        full_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        user_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        facebook: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        refesh_token: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        accept_token: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        avatar: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        money: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        id_parent: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        code_referral: {
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("UserVikmoneys");
    },
};
// Compare this snippet from src/database/migrations/create-user-vikmoney.js:
