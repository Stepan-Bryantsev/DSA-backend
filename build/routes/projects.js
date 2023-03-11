import express from "express";
import { createApplication, createProject, editProject, getCategories, getIncomingApplications, getProjects, getSentApplications, getUserProjects, } from "../controllers/ProjectController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { applicationValidation, createProjectValidation, editProjectValidation, } from "../utils/projectsValidations.js";
const router = express.Router({ mergeParams: true });
router.use(checkAuth);
router.route("/").get(getProjects);
router.route("/").post(createProjectValidation, handleValidationErrors, createProject);
router.route("/").patch(editProjectValidation, handleValidationErrors, editProject);
router.route("/my").get(getUserProjects);
router.route("/getCategories").get(getCategories);
router.route("/getSentApplications").get(getSentApplications);
router.route("/getIncomingApplications").get(getIncomingApplications);
router.route("/apply").post(applicationValidation, handleValidationErrors, createApplication);
export default router;
//# sourceMappingURL=projects.js.map