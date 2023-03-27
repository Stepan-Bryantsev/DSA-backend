import { body } from "express-validator";

export const createProjectValidation = [
  body("name", "Wrong name").isLength({ min: 3 }),
  body("description", "Wrong description").isLength({ min: 3 }),
  body("contacts", "Wrong contacts").isLength({ min: 3 }),
  body("startDate", "Wrong startDate").optional({ nullable: true }).isISO8601(),
  body("endDate", "Wrong endDate").optional({ nullable: true }).isISO8601(),
  body("applicationDeadline", "Wrong applicationDeadline").optional({ nullable: true }).isISO8601(),
  body("employmentType", "Wrong employmentType").optional({ nullable: true }).isNumeric(),
  body("territory", "Wrong territory").optional({ nullable: true }).isString(),
  body("skills", "Wrong skills").optional({ nullable: true }).isString(),
  body("creditNumber", "Wrong creditNumber").optional({ nullable: true }).isNumeric(),
  body("campus", "Wrong campus").optional({ nullable: true }).isNumeric(),
  body("participantsNumber", "Wrong participantsNumber").optional({ nullable: true }).isNumeric(),
  body("projectType", "Wrong projectType").optional({ nullable: true }).isNumeric(),
  body("weeklyHours", "Wrong weeklyHours").optional({ nullable: true }).isNumeric(),
];

export const editProjectValidation = [
  body("name", "Wrong name").optional({ nullable: true }).isLength({ min: 3 }),
  body("description", "Wrong description").optional({ nullable: true }).isLength({ min: 3 }),
  body("contacts", "Wrong contacts").optional({ nullable: true }).isLength({ min: 3 }),
  body("startDate", "Wrong startDate").optional({ nullable: true }).isISO8601(),
  body("endDate", "Wrong endDate").optional({ nullable: true }).isISO8601(),
  body("applicationDeadline", "Wrong applicationDeadline").optional({ nullable: true }).isISO8601(),
  body("employmentType", "Wrong employmentType").optional({ nullable: true }).isNumeric(),
  body("territory", "Wrong territory").optional({ nullable: true }).isString(),
  body("skills", "Wrong skills").optional({ nullable: true }).isString(),
  body("creditNumber", "Wrong creditNumber").optional({ nullable: true }).isNumeric(),
  body("campus", "Wrong campus").optional({ nullable: true }).isNumeric(),
  body("participantsNumber", "Wrong participantsNumber").optional({ nullable: true }).isNumeric(),
  body("projectType", "Wrong projectType").optional({ nullable: true }).isNumeric(),
  body("weeklyHours", "Wrong weeklyHours").optional({ nullable: true }).isNumeric(),
];

export const applicationValidation = [
  body("projectId", "Wrong name").isNumeric(),
  body("message", "Wrong message").isLength({ min: 3 }),
];
