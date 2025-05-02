import express from "express";
import { signIn, signUp } from "../controllers/user.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { signInSchema, signUpSchema } from "../validations/user.schema.js";

export const userRoute = express.Router();

userRoute.post("/signin", validate(signInSchema), signIn);
userRoute.post("/signup", validate(signUpSchema), signUp);
