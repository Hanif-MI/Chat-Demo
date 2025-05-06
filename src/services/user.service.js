import db from "../models/index.js";
import user from "../models/user.js";
import { ApiError } from "../utils/ApiResponse.js";
import { RESPONSE_CODE } from "../utils/constant.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/helper.js";
import { findRoomIdByUserPair } from "./chat.service.js";

const { User, message } = db;

const signUpService = async (data) => {
  try {
    const { email, password, username, phone } = data;
    const user = await findUserByEmail(email);
    if (user) {
      throw new ApiError(RESPONSE_CODE.BAD_REQUEST, "User already exists");
    }
    const encryptPass = await hashPassword(password);
    return await User.create({
      email,
      password: encryptPass,
      username,
      phone,
    }).then((user) => {
      const { password, deletedAt, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });
  } catch (error) {
    handleError(error);
  }
};

const signInService = async ({ email, password }) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new ApiError(RESPONSE_CODE.BAD_REQUEST, "User not found");
    }
    const compare = await comparePassword(password, user.password);
    if (!compare) {
      throw new ApiError(RESPONSE_CODE.BAD_REQUEST, "Password is incorrect");
    }
    const token = generateToken(user.id);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  } catch (error) {
    handleError(error);
  }
};

const usersService = async () => {
  try {
    const users = await User.findAll({
     // where: { email: { [Op.ne]: email } },
      attributes: [
        'id',
        'username',
        // 'avatar',
        // 'lastMessage',
        // 'lastMessageTime', 
        // 'isOnline',
        // 'unreadCount'
      ],
      raw: true
    });

    return {
      users: users.map(user => ({
        id: user.id,
        username: user.username,
        avatar: user.avatar || null,
        lastMessage: user.lastMessage || null,
        lastMessageTime: user.lastMessageTime || null,
        isOnline: Boolean(user.isOnline),
        unreadCount: user.unreadCount || 0
      }))
    };

} catch (error) {
    handleError(error);
}};



const handleError = (error) => {
  if (error instanceof ApiError) throw error;
  throw new ApiError(RESPONSE_CODE.INTERNAL_SERVER, error);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const getUserMessagesService = async (userId, currentUserId) => {
  try {
    // Check if the user exists
    const room = await findRoomIdByUserPair(userId,currentUserId)
    if (!room) {
      throw new ApiError(RESPONSE_CODE.BAD_REQUEST, "Room not found");
    }
    console.log("room", room);
    const messages = await message.findAll({
      where: {
        room
      },
      order: [['createdAt', 'ASC']],
    });
    console.log("messages", messages);
    return messages;
  } catch (error) {
    handleError(error);
  }
};

export { signUpService, signInService, handleError, usersService, getUserMessagesService };
