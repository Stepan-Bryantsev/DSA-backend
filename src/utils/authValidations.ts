import { body } from "express-validator";

export const loginValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "Wrong password length").isLength({ min: 5 })
];

export const registerValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "Wrong password length").isLength({ min: 5 }),
  body("fullName", "Wrong full name").isLength({ min: 3 }),
];
