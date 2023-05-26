import express from "express";
import { getCategories, getFaculties, getUserProfile, getUsersProfile, setUserProfile, } from "../controllers/AccountController.js";
import { accountValidation } from "../utils/accountValidations.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
const router = express.Router({ mergeParams: true });
router.use(checkAuth);
router.route("/").get(getUserProfile);
router.route("/").patch(accountValidation, handleValidationErrors, setUserProfile);
router.route("/getUser/:id").get(getUsersProfile);
router.route("/getFaculties").get(getFaculties);
router.route("/getCategories").get(getCategories);
export default router;
//# sourceMappingURL=account.js.map