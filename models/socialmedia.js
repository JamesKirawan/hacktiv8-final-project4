"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
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
    }
  }
  SocialMedia.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      social_media_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SocialMedia",
    }
  );
  return SocialMedia;
};
