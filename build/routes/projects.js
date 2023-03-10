import express from "express";
import { createProject, getProjects, getUserProjects } from "../controllers/ProjectController.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidationErrors from "../utils/handleValidationErrors.js";
import { projectValidation } from "../utils/projectsValidations.js";
const router = express.Router({ mergeParams: true });
router.use(checkAuth);
router.route("/").get(getProjects);
router.route("/my").get(getUserProjects);
router.route("/").post(projectValidation, handleValidationErrors, createProject);
export default router;
//# sourceMappingURL=projects.js.map