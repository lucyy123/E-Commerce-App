import { connnectDb } from './../utils/mongoDb.js';
import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import {
  BaseQuery,
  NewProductRequestBody,
  NewUserRequestBody,
  SearchRequestQuery,
} from "../types/user.js";

import { faker } from '@faker-js/faker';


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

// get filtered filters

export const getSearchedProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>,res,next)  => {
    const { search, sort, category, price } = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_LIMIT) || 8;

    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = { $regex: search, $options: "i" };
    }
    if (price) {
      baseQuery.price = { $lte: Number(price) };
    }
    if (category) {
      baseQuery.category = category;
    }

    //   why used promise.all :- lets see the case, if user is trying to access the list of products with specific
    //   catergory so in our case first the sorting products code get executed and then the
    //   filtered prouduct code gets execute becouse we are using await

    const productsPromise = Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [products, fileteredProducts] = await Promise.all([
      productsPromise,
      Product.find(baseQuery),
    ]);

    // products with sort and limit
    // const products = await Product.find(baseQuery).sort( sort &&{price:sort==="asc"?1:-1} ).limit(limit).skip(skip)

    // products with filters
    // const fileteredProducts = await Product.find(baseQuery)

    const total_Pages = Math.ceil(fileteredProducts.length / limit);

    return res.status(200).json({
      success: true,
      products,
      total_Pages
    });
  }
);

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



// const generateRandomProducts = async  (count:number=10)=>{

//   const products=[]

//   for (let i=0;i<count;i++){


//     const prouduct ={

//       name: faker.commerce.productName(),
//       photo: "uploads\\8d858a57-6856-4db0-b42e-ce2774dca925.jpg",
//       price: faker.commerce.price({min:1500,max:150000,dec:0}),
//       stock:faker.commerce.price({min:0,max:1500,dec:0}),
//       category: faker.commerce.department(),
//       createdAt: new Date (faker.date.past()),
//       updatedAt: new Date (faker.date.recent()),
   
//     };
//     products.push(prouduct);
//   }

//   await Product.create(products);
//   console.log({successe:true})
// }
// // generateRandomProducts(40)


// const deletedProducts = async (count:number=10)=>{

// const products =await Product.find({}).skip(2)

// for (let i=0;i<products.length;i++){
//   const product = products[i]
//   await product.deleteOne()
// }
// console.log({successe:true})

// }

// // deletedProducts(40)