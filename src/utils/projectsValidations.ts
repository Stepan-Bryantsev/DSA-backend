import { body } from "express-validator";

export const createProjectValidation = [
  body("name", "Wrong name").isLength({ min: 3 }),
  body("description", "Wrong description").isLength({ min: 3 }),
  body("contacts", "Wrong contacts").isLength({ min: 3 }),
  body("startDate", "Wrong startDate").optional().isISO8601(),
  body("endDate", "Wrong endDate").optional().isISO8601(),
  body("applicationDeadline", "Wrong applicationDeadline").optional().isISO8601(),
  body("employmentType", "Wrong employmentType").optional().isNumeric(),
  body("territory", "Wrong territory").optional().isString(),
  body("skills", "Wrong skills").optional().isString(),
  body("creditNumber", "Wrong creditNumber").optional().isNumeric(),
  body("campus", "Wrong campus").optional().isNumeric(),
  body("participantsNumber", "Wrong participantsNumber").optional().isNumeric(),
  body("projectType", "Wrong projectType").optional().isNumeric(),
  body("weeklyHours", "Wrong weeklyHours").optional().isNumeric(),
];

export const editProjectValidation = [
  body("name", "Wrong name").optional().isLength({ min: 3 }),
  body("description", "Wrong description").optional().isLength({ min: 3 }),
  body("contacts", "Wrong contacts").optional().isLength({ min: 3 }),
  body("startDate", "Wrong startDate").optional().isISO8601(),
  body("endDate", "Wrong endDate").optional().isISO8601(),
  body("applicationDeadline", "Wrong applicationDeadline").optional().isISO8601(),
  body("employmentType", "Wrong employmentType").optional().isNumeric(),
  body("territory", "Wrong territory").optional().isString(),
  body("skills", "Wrong skills").optional().isString(),
  body("creditNumber", "Wrong creditNumber").optional().isNumeric(),
  body("campus", "Wrong campus").optional().isNumeric(),
  body("participantsNumber", "Wrong participantsNumber").optional().isNumeric(),
  body("projectType", "Wrong projectType").optional().isNumeric(),
  body("weeklyHours", "Wrong weeklyHours").optional().isNumeric(),
];

export const applicationValidation = [
  body("projectId", "Wrong name").isNumeric(),
  body("message", "Wrong message").isLength({ min: 3 }),
];
