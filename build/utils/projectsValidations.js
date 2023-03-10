import { body } from "express-validator";
export const projectValidation = [
    body("name", "Wrong name").isLength({ min: 3 }),
    body("description", "Wrong description").isLength({ min: 3 }),
    body("contacts", "Wrong contacts").isLength({ min: 3 }),
];
//# sourceMappingURL=projectsValidations.js.map