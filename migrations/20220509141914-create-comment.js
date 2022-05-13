"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Comments", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        UserId: {
          type: Sequelize.INTEGER,
        },
        PhotoId: {
          type: Sequelize.INTEGER,
        },
        comment: {
          type: Sequelize.TEXT,
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
        queryInterface.addConstraint("Comments", {
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
    queryInterface.addConstraint("Comments", {
      fields: ["PhotoId"],
      type: "foreign key",
      name: "photo_fk",
      references: {
        table: "Photos",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Comments");
  },
};
