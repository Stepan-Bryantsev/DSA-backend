import dataSource from "../database.js";
import Project from "../models/Project.js";
import { In, Like, Not } from "typeorm";
import Category from "../models/Category.js";
import Application from "../models/Application.js";
export const getProjects = async (req, res) => {
    try {
        const projectsRepo = dataSource.getRepository(Project);
        const searchParam = req.query.search ? req.query.search : "";
        const projects = await projectsRepo.findAndCount({
            select: {
                creatorUserId: false,
            },
            relations: {
                user: true,
                categories: true,
            },
            where: [
                { name: Like(`%${searchParam}%`), creatorUserId: Not(req.userId) },
                { description: Like(`%${searchParam}%`), creatorUserId: Not(req.userId) },
            ],
            order: {
                id: "DESC",
            },
            skip: req.query.skip,
            take: req.query.take,
        });
        res.status(200).json({
            projects: projects[0].map((p) => {
                const { user, creatorUserId, ...projectData } = p;
                const userFullName = user.fullName;
                return {
                    ...projectData,
                    userFullName,
                };
            }),
            count: projects[1],
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const getProject = async (req, res) => {
    try {
        const projectsRepo = dataSource.getRepository(Project);
        const project = await projectsRepo.findOne({
            select: {
                creatorUserId: false,
            },
            relations: {
                user: true,
                categories: true,
            },
            where: {
                id: req.params.id,
            },
            order: {
                id: "DESC",
            },
        });
        res.status(200).json(project);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const getUserProjects = async (req, res) => {
    try {
        const projectsRepo = dataSource.getRepository(Project);
        console.log(req.userId);
        const projects = await projectsRepo.findAndCount({
            select: {
                creatorUserId: false,
            },
            relations: {
                user: true,
                categories: true,
            },
            where: {
                creatorUserId: req.userId,
            },
            order: {
                id: "DESC",
            },
            skip: req.query.skip,
            take: req.query.take,
        });
        res.status(200).json({
            projects: projects[0].map((p) => {
                const { user, creatorUserId, ...projectData } = p;
                const userFullName = user.fullName;
                return {
                    ...projectData,
                    userFullName,
                };
            }),
            count: projects[1],
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const createProject = async (req, res) => {
    try {
        const projectsRepo = dataSource.getRepository(Project);
        const categoriesRepo = dataSource.getRepository(Category);
        const newProject = new Project();
        newProject.creatorUserId = req.userId;
        newProject.name = req.body.name;
        newProject.description = req.body.description;
        newProject.contacts = req.body.contacts;
        newProject.isClosed = false;
        const existingCategories = await categoriesRepo.find({
            where: {
                id: In(req.body.categories),
            },
        });
        const existingCustomCat = await categoriesRepo.find({
            where: {
                category: In(req.body.customCategories),
            },
        });
        const customCategories = req.body.customCategories
            .filter((c) => !existingCustomCat.map((x) => x.category).includes(c))
            .map((c) => {
            const cat = new Category();
            cat.category = c;
            cat.isCustom = true;
            return cat;
        });
        await categoriesRepo.save(customCategories);
        newProject.categories = existingCategories.concat(existingCustomCat).concat(customCategories);
        await projectsRepo.save(newProject);
        res.status(201).json({
            Success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const editProject = async (req, res) => {
    try {
        const projectsRepo = dataSource.getRepository(Project);
        const editProject = await projectsRepo.findOneBy({ id: req.body.projectId });
        if (!editProject) {
            return res.status(400).json({
                message: "Project does not exist",
            });
        }
        if (editProject.creatorUserId != req.userId) {
            return res.status(400).json({
                message: "You are not project creator",
            });
        }
        editProject.name = req.body.name ? req.body.name : editProject.name;
        editProject.description = req.body.description ? req.body.description : editProject.description;
        editProject.contacts = req.body.contacts ? req.body.contacts : editProject.contacts;
        editProject.updatedDate = new Date();
        await projectsRepo.save(editProject);
        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const getCategories = async (req, res) => {
    try {
        const categoryRepo = dataSource.getRepository(Category);
        const categories = await categoryRepo.find({
            where: {
                isCustom: false,
            },
        });
        res.status(200).json(categories);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const createApplication = async (req, res) => {
    try {
        const applicationRepo = dataSource.getRepository(Application);
        const existingApplication = await applicationRepo.findOne({
            where: {
                applicantId: req.userId,
                projectId: req.body.projectId,
            },
        });
        if (existingApplication) {
            return res.status(400).json({
                message: "Application already exists",
            });
        }
        const newApplication = new Application();
        newApplication.applicantId = req.userId;
        newApplication.projectId = req.body.projectId;
        newApplication.message = req.body.message;
        newApplication.status = 1;
        applicationRepo.save(newApplication);
        res.status(201).json({
            success: true,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const getSentApplications = async (req, res) => {
    try {
        const applicationRepo = dataSource.getRepository(Application);
        const userApplications = await applicationRepo.findOne({
            where: {
                applicantId: req.userId,
            },
        });
        res.status(200).json(userApplications);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const getIncomingApplications = async (req, res) => {
    try {
        const applicationRepo = dataSource.getRepository(Application);
        const applications = await applicationRepo.find({
            where: {
                project: {
                    creatorUserId: req.userId,
                },
            },
        });
        res.status(200).json(applications);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const processApplication = async (req, res) => {
    try {
        const applicationRepo = dataSource.getRepository(Application);
        const action = req.body.action;
        if (action !== 2 && action !== 3) {
            return res.status(400).json({
                message: "Wrong action",
            });
        }
        const application = await applicationRepo.findOne({
            where: {
                id: req.body.applicationId,
            },
            relations: {
                project: true,
            },
        });
        if (!application) {
            return res.status(400).json({
                message: "Application not found",
            });
        }
        if (application.project.creatorUserId != req.userId) {
            return res.status(400).json({
                message: "You are not project owner",
            });
        }
        application.status = req.body.action;
        await applicationRepo.save(application);
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
//# sourceMappingURL=ProjectController.js.map