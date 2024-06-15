import { Response, Request,NextFunction } from "express";
import { EnumType } from "typescript";


// use interface for class or object
export interface NewUserRequestBody {
    _id:string;
    name:string;
    email:string;
    photo:string;
    role:string;
    gender:string;
    dob:Date;
}

// user type for prop OR functions
export type ControllerType = (
    req:Request,res:Response,next:NextFunction
)=> Promise<void|Response<any,Record<string,any>>>