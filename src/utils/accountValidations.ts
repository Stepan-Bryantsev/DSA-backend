import { body } from "express-validator";

export const accountValidation = [
  body("email", "Wrong email format").optional().isEmail(),
  body("fullName", "Wrong full name").optional().isLength({ min: 3 }),
  body("facultyId", "Wrong faculty format").optional().isNumeric(),
  body("bio", "Wrong bio format").optional().isNumeric(),
];
