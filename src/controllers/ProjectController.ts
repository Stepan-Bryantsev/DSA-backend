import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dataSource from "../database.js";
import Project from "../models/Project.js";

interface getProjectsQuery {
  skip: number;
  take: number;
}

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projectsRepo = dataSource.getRepository(Project);

    const projects = await projectsRepo.findAndCount({
      order: {
        id: "DESC",
      },
      skip: req.query.skip as any,
      take: req.query.take as any,
    });

    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUserProjects = async (req: Request, res: Response) => {
  try {
    const projectsRepo = dataSource.getRepository(Project);

    console.log(req.userId);

    const projects = await projectsRepo.findAndCount({
      where: {
        creator_user_id: req.userId,
      },
      order: {
        id: "DESC",
      },
      skip: req.query.skip as any,
      take: req.query.take as any,
    });

    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const projectsRepo = dataSource.getRepository(Project);

    const newProject = new Project();
    newProject.creator_user_id = req.userId;
    newProject.name = req.body.name;
    newProject.description = req.body.description;
    newProject.contacts = req.body.contacts;
    newProject.is_closed = false;

    await projectsRepo.save(newProject);

    res.status(201).json({
      Success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
