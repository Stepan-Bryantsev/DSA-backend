import express from "express";
import { register, login } from "../controllers/AuthController.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { registerValidation, loginValidation } from "../utils/authValidations.js";
const router = express.Router({ mergeParams: true });
router.route("/register").post(registerValidation, handleValidationErrors, register);
router.route("/login").post(loginValidation, handleValidationErrors, login);
export default router;
//# sourceMappingURL=auth.js.map