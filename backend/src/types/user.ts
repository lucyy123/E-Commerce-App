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
export interface NewProductRequestBody {
    name:string;
    photo:string;
    stock:number;
    category:string;
    price:number;
}

// user type for prop OR functions
export type ControllerType = (
    req:Request,res:Response,next:NextFunction
)=> Promise<void|Response<any,Record<string,any>>>

export type SearchRequestQuery={
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
}

export interface BaseQuery {

    name?:{
    $regex:string,
    $options:string,
    },

    price?:{
$lte:number
    };

    category?:string;
}