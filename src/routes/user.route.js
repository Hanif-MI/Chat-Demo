import express from "express";
import { signIn, signUp, userMessages, users } from "../controllers/user.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { signInSchema, signUpSchema } from "../validations/user.schema.js";
import authMiddleware from "../middleware/auth.middleware.js";

export const userRoute = express.Router();

userRoute.post("/signin", validate(signInSchema), signIn);
userRoute.post("/signup", validate(signUpSchema), signUp);
userRoute.get("/users", users);
userRoute.post("/messages", authMiddleware,userMessages);
