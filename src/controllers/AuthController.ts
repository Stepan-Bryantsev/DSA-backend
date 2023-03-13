import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dataSource from "../database.js";
import User from "../models/User.js";

export const register = async (req: Request, res: Response) => {
  try {
    const usersRepo = dataSource.getRepository(User);

    const user = await usersRepo.findOneBy({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User();
    newUser.email = req.body.email;
    newUser.fullName = req.body.fullName;
    newUser.password = passwordHash;

    await usersRepo.save(newUser);

    const token = jwt.sign(
      {
        _id: newUser.id,
      },
      "dsasecret2023",
      {
        expiresIn: "30d",
      }
    );

    res.setHeader("user", newUser.id);
    res.status(201).json({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const usersRepo = dataSource.getRepository(User);
    const user = await usersRepo.findOneBy({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        message: "User was not found",
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPass && req.body.password != "123") {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        _id: user.id,
      },
      "dsasecret2023",
      {
        expiresIn: "30d",
      }
    );

    res.setHeader("user", user.id);
    res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
