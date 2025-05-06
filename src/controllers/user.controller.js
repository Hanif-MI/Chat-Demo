import {
  getUserMessagesService,
  signInService,
  signUpService,
  usersService,
} from "../services/user.service.js";
import { ApiSuccessResponse } from "../utils/ApiResponse.js";

const signUp = async (req, res, next) => {
  try {
    const user = await signUpService(req.body);
    res.send(
      ApiSuccessResponse.create({
        statusCode: 201,
        message: "User created successfully",
        data: user,
      })
    );
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const response = await signInService(req.body);
    res.send(
      ApiSuccessResponse.create({
        statusCode: 200,
        message: "User logged in successfully",
        data: response,
      })
    );
  } catch (error) {
    next(error);
  }
};

const users = async (req, res, next) => {
  try {
    console.log("!@#$ Here");
    const response = await usersService();
    res.send(
      ApiSuccessResponse.create({
        statusCode: 200,
        message: "User logged in successfully",
        data: response,
      })
    );
  } catch (error) {
    next(error);
  }
};

const userMessages = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const response = await getUserMessagesService(userId, req.user);
    res.send(
      ApiSuccessResponse.create({
        statusCode: 200,
        message: "User logged in successfully",
        data: response,
      })
    );
  } catch (error) {
    next(error);
  }
};

export { signIn, signUp, users, userMessages };
