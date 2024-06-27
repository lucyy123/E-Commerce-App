import { User } from "../models/user.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
import { TryCatch } from "./error.js";

export const AdminOnly=TryCatch(

async (req,res,next)=>{

const  {id} = req.query 

console.log('id:', id)


if(!id){
  return  next((new ErrorHandler("Please Login first",401)))
}

const user=await User.findById(id)


if(!user){
  return  next((new ErrorHandler("Invalid Id. not found",404)))
}

//403 Forbidden :- This status code indicates that the server understands the request, 
// but the user does not have the necessary permissions to access the resource
if(user?.role !="admin"){
   return next((new ErrorHandler("You Don't have the permission,Forbidden",403)))
}

next()

}
)