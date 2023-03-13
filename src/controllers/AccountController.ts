import { Request, Response } from "express";
import { In } from "typeorm";
import dataSource from "../database.js";
import Category from "../models/Category.js";
import Faculty from "../models/Faculty.js";
import User from "../models/User.js";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const usersRepo = dataSource.getRepository(User);

    const userProfile = await usersRepo.findOne({
      where: {
        id: req.userId,
      },
      relations: {
        faculty: true,
        categories: true,
      },
    });

    if (!userProfile) {
      return res.status(403).json({ message: "error" });
    }

    const { password, ...userData } = userProfile;
    res.status(200).json({ ...userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getUsersProfile = async (req: Request, res: Response) => {
  try {
    const usersRepo = dataSource.getRepository(User);

    const userProfile = await usersRepo.findOne({
      where: {
        id: req.params.id as any,
      },
      relations: {
        faculty: true,
        categories: true,
      },
    });

    if (!userProfile) {
      return res.status(403).json({ message: "error" });
    }

    const { password, ...userData } = userProfile;
    res.status(200).json({ ...userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categoryRepo = dataSource.getRepository(Category);

    const categories = await categoryRepo.find({
      where: {
        isCustom: false,
      },
    });

    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const setUserCategories = async (req: Request, res: Response) => {
  try {
    const usersRepo = dataSource.getRepository(User);
    const categoriesRepo = dataSource.getRepository(Category);

    const currentUser = await usersRepo.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!currentUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

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
      .filter((c: string) => !existingCustomCat.map((x) => x.category).includes(c))
      .map((c: string) => {
        const cat = new Category();
        cat.category = c;
        cat.isCustom = true;
        return cat;
      });

    await categoriesRepo.save(customCategories);

    currentUser.categories = existingCategories.concat(existingCustomCat).concat(customCategories);

    await usersRepo.save(currentUser);

    res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getFaculties = async (req: Request, res: Response) => {
  try {
    const facultyRepo = dataSource.getRepository(Faculty);

    const faculties = await facultyRepo.find();

    res.status(200).json(faculties);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const setUserFaculty = async (req: Request, res: Response) => {
  try {
    const usersRepo = dataSource.getRepository(User);

    const currentUser = await usersRepo.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!currentUser) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    currentUser.facultyId = req.body.facultyId;

    await usersRepo.save(currentUser);

    res.status(201).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
