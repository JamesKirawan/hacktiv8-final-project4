"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "user",
      });
      this.hasMany(models.Comment, {
        foreignKey: "PhotoId",
        as: "comment",
      });
    }
  }
  Photo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      poster_image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Must Be A Valid Url",
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Photo",
    }
  );
  return Photo;
};
