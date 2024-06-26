import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/types.js";
import ErrorHandler from "../utils/errorHandlerClass.js";

export const errorMiddleWare = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // err.message = err.message || "some error form backend side"   ----> long form
  err.message ||= "some error from backend side"; // -----> short form
  err.statusCode ||= 500;
  console.log('err:', err)
  //e--> num = num +1 ---> long form
  //e--> num += 1  ---> short form
  
if(err.name==="CastError") {
  err.message="Invalid Order ID"
}


  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};



export const TryCatch=(func:ControllerType)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        return Promise.resolve(func(req,res,next)).catch((next))
    }
}