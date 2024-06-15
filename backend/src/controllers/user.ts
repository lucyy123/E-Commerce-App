import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/user.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {

      throw Error("my custom error")
      const { name, email, _id, photo, gender, dob } = req.body;
      console.log("pasting values" + name, email, _id, photo, gender, dob);

      const user = await User.create({
        name,
        email,
        _id,
        photo,
        gender,
        dob: new Date(dob),
      });

      return res.status(201).json({
        success: true,
        message: `Welcome user ${name} `,
      });
  
  }
);
