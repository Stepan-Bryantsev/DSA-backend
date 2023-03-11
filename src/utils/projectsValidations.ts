import { body } from "express-validator";

export const createProjectValidation = [
  body("name", "Wrong name").isLength({ min: 3 }),
  body("description", "Wrong description").isLength({ min: 3 }),
  body("contacts", "Wrong contacts").isLength({ min: 3 }),
];

export const editProjectValidation = [
  body("name", "Wrong name").optional().isLength({ min: 3 }),
  body("description", "Wrong description").optional().isLength({ min: 3 }),
  body("contacts", "Wrong contacts").optional().isLength({ min: 3 }),
];

export const applicationValidation = [
  body("projectId", "Wrong name").isNumeric(),
  body("message", "Wrong contacts").isLength({ min: 3 }),
];
