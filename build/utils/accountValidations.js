import { body } from "express-validator";
export const facultyValidation = [body("facultyId", "Wrong faculty format").isNumeric()];
//# sourceMappingURL=accountValidations.js.map