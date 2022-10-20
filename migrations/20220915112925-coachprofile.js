"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("coachprofiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shortDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      specialityId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "specialities",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("coachprofiles");
  },
};
