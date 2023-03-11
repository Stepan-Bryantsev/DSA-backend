import dataSource from "../database.js";
import Project from "../models/Project.js";
import { In, Like } from "typeorm";
import Category from "../models/Category.js";
import Application from "../models/Application.js";
export const getProjects = async (req, res) => {
    try {
        const projectsRepo = dataSource.getRepository(Project);
        const projects = await projectsRepo.findAndCount({
            select: {
                creator_user_id: false,
            },
            relations: {
                user: true,
                categories: true,
            },
            where: [
                { name: Like(`%${req.query.search}%`) },
                { description: Like(`%${req.query.search}%`) },
            ],
            order: {
                id: "DESC",
            },
            skip: req.query.skip,
            take: req.query.take,
        });
        res.status(200).json({
            projects: projects[0].map((p) => {
                const { user, creator_user_id, ...projectData } = p;
                const userFullName = user.fullname;
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
export const getUserProjects = async (req, res) => {
    try {
        const projectsRepo = dataSource.getRepository(Project);
        console.log(req.userId);
        const projects = await projectsRepo.findAndCount({
            select: {
                creator_user_id: false,
            },
            relations: {
                user: true,
                categories: true,
            },
            where: {
                creator_user_id: req.userId,
            },
            order: {
                id: "DESC",
            },
            skip: req.query.skip,
            take: req.query.take,
        });
        res.status(200).json({
            projects: projects[0].map((p) => {
                const { user, creator_user_id, ...projectData } = p;
                const userFullName = user.fullname;
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
        newProject.creator_user_id = req.userId;
        newProject.name = req.body.name;
        newProject.description = req.body.description;
        newProject.contacts = req.body.contacts;
        newProject.is_closed = false;
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
            cat.is_custom = true;
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
        if (editProject.creator_user_id != req.userId) {
            return res.status(400).json({
                message: "You are not project creator",
            });
        }
        editProject.name = req.body.name ? req.body.name : editProject.name;
        editProject.description = req.body.description ? req.body.description : editProject.description;
        editProject.contacts = req.body.contacts ? req.body.contacts : editProject.contacts;
        editProject.updated_date = new Date();
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
                is_custom: false,
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
                applicant_id: req.userId,
                project_id: req.body.projectId,
            },
        });
        if (existingApplication) {
            return res.status(400).json({
                message: "Application already exists",
            });
        }
        const newApplication = new Application();
        newApplication.applicant_id = req.userId;
        newApplication.project_id = req.body.projectId;
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
                applicant_id: req.userId,
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
                    creator_user_id: req.userId,
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
//# sourceMappingURL=ProjectController.js.map