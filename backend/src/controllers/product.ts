import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { NewProductRequestBody, NewUserRequestBody } from "../types/user.js";

import { Request, NextFunction, Response } from "express";
import ErrorHandler from "../utils/errorHandlerClass.js";
import { rm } from "fs";

// create / post new product
export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!name || !price || !stock || !category) {
      rm(photo!.path, () => {
        console.log("Photo is Deleted");
      });
      return next(new ErrorHandler("Please enter all feilds", 400));
    }
    if (!photo) return next(new ErrorHandler("Please add photo", 400));

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

// get the latest products

export const getlatestProducts = TryCatch(async (req, res, next) => {
  const latesProducts = await Product.find({}).sort({ createdAt: -1 }).limit(5);

  //"Malformed part header":- do not leave the space in the key of form data
  return res.status(201).json({
    success: true,
    latesProducts,
  });
});

export const getGategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");
  // Distinct {unique or isolated} :-
  //Finds the distinct values for a specified field across a single collection or view and returns the results in an array.

  return res.status(200).json({
    success: true,
    categories,
  });
});

// to get all the list of products
export const AdminProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({});

  return res.status(200).json({
    success: true,
    products,
  });
});

// get single products by its ID
export const singleProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  console.log("products id:", id);

  const product = await Product.findById(id);

  return res.status(200).json({
    success: true,
    product,
  });
});

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const { name, price, category, stock } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product not found", 400));

  // if user re-upload the photo then , delete the old one and add the latest

  if (photo) {
    rm(product.photo, () => {
      console.log("Old Photo deleted");
    });
    product.photo = photo.path;
  }

  // if name is true :- its mean user is sending the name from body so only this
  //  name value is replace the product name and else all conditions are become false
  // same applying to otheres
  if (name) product.name = name;
  if (price) product.price = price;
  if (category) product.category = category;
  if (stock) product.stock = stock;

  //.save is used to save the collection details
  await product.save();

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  rm(product.photo, () => {
    console.log("Product photo deleted");
  });

  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
