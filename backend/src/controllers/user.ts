import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/user.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/errorHandlerClass.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, _id, photo, gender, dob } = req.body;
    console.log("pasting values" + name, email, _id, photo, gender, dob);

    // if user is already exist

    let user = await User.findById(_id);

    if (user) {
      console.log("User is Already exist!");
      return res.status(201).json({
        success: true,
        message: `Welcome ${name} `,
      });
    }


    // if user is not exist and trying to hit the login button
    if (!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please add all fields", 400));

    user = await User.create({
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
 
// Get All Users
 
export const getAllUsers = TryCatch(
  async (
  req,
  res ,
  next 
)=>{
  const users =await User.find({})

  return res.status(201).json({
    success: true,
    users,
  });
} )


// Get user by ID

export const getUserbyID = TryCatch( async (
  req,
  res ,
  next 
)=>{


  const id = req.params.id;

  const user =await User.findById(id)

  if(!user) return next (new ErrorHandler("Invalid User",400))

    return res.status(201).json({
      success: true,
      user,
    });

});


// Delete user by ID

export const deleteUser = TryCatch( async (
  req,
  res ,
  next 
)=>{


  const id = req.params.id;

  const user =await User.findByIdAndDelete(id)

  if(!user) return next (new ErrorHandler("Invalid User",400))

    return res.status(200).json({
      success: true,
      message:`User with Id : ${id} is  Deleted`,
      user,
    });

});