import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandlerClass.js";
import { ControllerType } from "../types/user.js";

export const errorMiddleWare = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // err.message = err.message || ""   ----> long form
  err.message ||= "some error from backend side"; // -----> short form
 err.statusCode ||= 500;
  //e--> num = num +1 ---> long form
  //e--> num += 1  ---> short form

  return res.status(err.statusCode).json({
    success: true,
    message: err.message,
  });
};



export const TryCatch=(func:ControllerType)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        return Promise.resolve(func(req,res,next)).catch((next))
    }
}