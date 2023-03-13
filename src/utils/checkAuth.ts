import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "dsasecret2023") as { _id: number };

      res.setHeader("user", decoded._id);
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
  } else {
    return res.status(403).json({
      message: "Access denied",
    });
  }
};
