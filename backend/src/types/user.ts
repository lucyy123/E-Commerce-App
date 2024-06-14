import { EnumType } from "typescript";

export interface NewUserRequestBody{
    _id:string;
    name:string;
    email:string;
    photo:string;
    role:string;
    gender:string;
    dob:Date;
}