import { signInService, signUpService } from "../services/user.service.js";
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

export { signIn, signUp };
