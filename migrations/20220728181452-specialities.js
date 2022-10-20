"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("specialities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      speciality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coachId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Coach ID is required",
          },
          notNull: {
            msg: "Coach ID is required",
          },
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
    await queryInterface.dropTable("specialities");
  },
};
