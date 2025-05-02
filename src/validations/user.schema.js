import Joi from "joi";

const emailField = Joi.string().email().required();
const passwordField = Joi.string().required();

const signUpSchema = Joi.object({
  phone: Joi.string().required(),
  username: Joi.string().required(),
  email: emailField,
  password: passwordField,
});

const signInSchema = Joi.object({
  email: emailField,
  password: passwordField,
});

export { signUpSchema, signInSchema };
