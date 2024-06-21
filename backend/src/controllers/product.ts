import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { NewProductRequestBody, NewUserRequestBody } from "../types/user.js";

import { Request, NextFunction, Response } from "express";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });


    //"Malformed part header":- do not leave the space in the key of form data
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);
