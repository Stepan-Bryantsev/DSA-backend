import express from "express";
import { createApplication, createProject, editProject, getCategories, getIncomingApplications, getProject, getProjects, getSentApplications, getUserProjects, processApplication, } from "../controllers/ProjectController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { applicationValidation, createProjectValidation, editProjectValidation, } from "../utils/projectsValidations.js";
const router = express.Router({ mergeParams: true });
router.use(checkAuth);
router.route("/").get(getProjects);
router.route("/").post(createProjectValidation, handleValidationErrors, createProject);
router.route("/").patch(editProjectValidation, handleValidationErrors, editProject);
router.route("/getProject/:id").get(getProject);
router.route("/my").get(getUserProjects);
router.route("/getCategories").get(getCategories);
router.route("/getSentApplications").get(getSentApplications);
router.route("/getIncomingApplications").get(getIncomingApplications);
router.route("/apply").post(applicationValidation, handleValidationErrors, createApplication);
router.route("/processApplication").post(processApplication);
export default router;
//# sourceMappingURL=projects.js.map