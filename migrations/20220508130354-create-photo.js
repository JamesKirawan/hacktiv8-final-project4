"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Photos", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        caption: {
          type: Sequelize.TEXT,
        },
        poster_image_url: {
          type: Sequelize.TEXT,
        },
        UserId: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint("Photos", {
          fields: ["UserId"],
          type: "foreign key",
          name: "user_fk",
          references: {
            table: "Users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        })
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Photos");
  },
};
