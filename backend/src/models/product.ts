import mongoose from "mongoose";
import { trim } from "validator";

const productSchema=new mongoose.Schema({

name:{
    type:String,
    required:[true,"Please enter Product name"]
},

photo:{
    type:String,
    required:[true,"Please enter Product photo"]
},
price:{
    type:Number,
    required:[true,"Please enter Product Price"]
},
stock:{
    type:Number,
    required:[true,"Please enter Stock"]
},
category:{
    type:String,
    required:[true,"Please enter Category"],
    trim:true
    
}


},{
    timestamps:true
})

export const Product = mongoose.model("product",productSchema)