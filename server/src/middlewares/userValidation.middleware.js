import Joi from "joi";
import ExpressError from "../utils/ExpressError.js";

// Login Schema Validation
const loginSchemaValidation = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a valid email",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
});

// Signup Schema Validation
const signupSchemaValidation = Joi.object({
  name: Joi.string()
    .required()
    .messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a valid email",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required",
    }),
});

// Middleware for Register validation
export const validateRegister = (req, res, next) => {
  const { error, value } = signupSchemaValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message).join(", ");
    throw new ExpressError(400, messages);
  }
  req.body = value;
  next();
};

// Middleware for Login validation
export const validateLogin = (req, res, next) => {
  const { error, value } = loginSchemaValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message).join(", ");
    throw new ExpressError(400, messages);
  }
  req.body = value;
  next();
};
