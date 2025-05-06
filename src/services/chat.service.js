import db from "../models/index.js";
import { ApiError } from "../utils/ApiResponse.js";
import { RESPONSE_CODE } from "../utils/constant.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/helper.js";
import crypto from "crypto";

const { room_details } = db;

import { Op, fn, col, where } from "sequelize";

const findRoomIdByUserPair = async (userA, userB) => {
  const room = await room_details.findOne({
    where: {
      users: {
        [Op.contains]: [userA, userB],
      },
    },
    attributes: ["room_id"],
  });

  if (!room) {
    const newRoom = await room_details.create({
      room_id: crypto.randomUUID(),
      users: [userA, userB],
    });
    return newRoom.room_id;
  }

  return room?.room_id ?? null;
};

export { findRoomIdByUserPair };
