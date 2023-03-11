import express from "express";
import {
  getCategories,
  getFaculties,
  getUserProfile,
  setUserCategories,
  setUserFaculty,
} from "../controllers/AccountController.js";
import { facultyValidation } from "../utils/accountValidations.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";

const router = express.Router({ mergeParams: true });

router.use(checkAuth);

router.route("/").get(getUserProfile);
router.route("/getFaculties").get(getFaculties);
router.route("/setFaculty").post(facultyValidation, handleValidationErrors, setUserFaculty);
router.route("/getCategories").get(getCategories);
router.route("/setCategories").post(setUserCategories);

export default router;
