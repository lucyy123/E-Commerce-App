import { Response, Request,NextFunction } from "express";
import { EnumType } from "typescript";


// new user 
export interface NewUserRequestBody {
    _id:string;
    name:string;
    email:string;
    photo:string;
    role:string;
    gender:string;
    dob:Date;
}
// new product
export interface NewProductRequestBody {
    name:string;
    photo:string;
    stock:number;
    category:string;
    price:number;
}

// new order
export interface newOrderReqBody {
tax:number;
user:string;
total:number;
subTotal:number;
discount:number;
shippingCharges:number;
status:string;
shippingInfo:shippingInfo;
orderItems:orderItems[];
}


export type shippingInfo ={
    address:string;
    city:string;
    pinCode:number;
    state:string;
    country:string;
}

export type orderItems={
    name:string;
    photo:string;
    price:number;
    quantity:number;
    productId:string;

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


export type InvalidateCatheProps = {
    product?:boolean;
    admin?:boolean;
    order?:boolean;
}

