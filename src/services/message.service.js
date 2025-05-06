import db from "../models/index.js";
import { handleError } from "./user.service.js";

const { message } = db;

const insertMessage = async (data) => {
  try {
    const { userId, room, text } = data;
    return await message.create({
      userId,
      room,
      text,
    });
  } catch (error) {
    console.log("error" + error);
    handleError(error);
  }
};

export { insertMessage };
