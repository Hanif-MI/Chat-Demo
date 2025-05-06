"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class room_details extends Model {
    static associate(models) {
      // define association here
    }
  }
  room_details.init(
    {
      room_id: DataTypes.STRING,
      users: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "room_details",
      tableName: "room_details",
      paranoid: true,
      timestamps: true,
    }
  );
  return room_details;
};
