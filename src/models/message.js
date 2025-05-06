"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class message extends Model {
    static associate(models) {
      message.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
      });
    }
  }
  message.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      room: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "message",
      tableName: "messages",
      paranoid: true,
      timestamps: true,
    }
  );
  return message;
};
