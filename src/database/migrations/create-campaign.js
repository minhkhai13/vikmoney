"use strict";

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
        },
        domain_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Campaigns");
    },
    };