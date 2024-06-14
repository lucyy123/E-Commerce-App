import mongoose, { Schema } from "mongoose";
import validator from "validator";




interface Iuser extends Document{
    _id:string;
    name:string;
    email:string;
    photo:string;
    role:"user"|"admin";
    gender:"male" | "female";
    dob:Date;
    createdAt:Date;
    updatedAt:Date;
    age:number;
}


const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      require: [true, "Please Enter ID"],
    },

    name: {
      type: String,
      require: [true, "Please Enter Name"],
    },
    email: {
      type: String,
      require: [true, "Please Enter Email"],
      unique: [true, "Email is already Exist"],
      validate: validator.default.isEmail,
    },
    role: {
      type: String,
      enum: ["user","admin"],
      default: "user",
    },

    gender: {
      type: String,
      enum: ["male","Female"],
      require: [true, "Please Enter gender"],
    },
    dob: {
      type: Date,
      require: [true, "Please Enter Date of Birth"],
    },
    photo: {
      type: String,
      require: [true, "Please Add Photo"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("age").get(function(){
const today=new Date()
const dob=this.dob
let age=today.getFullYear() - dob!.getFullYear();

if(dob!.getMonth() > today.getMonth() || ( today?.getMonth() === dob!.getMonth() && today.getDate() < dob!.getDate())){
    age--
}

return age;
});


 export const User=mongoose.model<Iuser>("User",userSchema)


// dob=2000   today=2024     ===>    age 24 valid

// MONTHS

// dob 3-2000   today 6-2024 ===>    age 24 valid

// --------> dob 10 2000  today 6-2024 ===>    age 24 (but he is not 24 years old technically , so we need to decrease 24 by 1 ) actual age ==> 23
// |
// DATES
// |
// --------> dob  17 2000  today 13 2024 ===>  age 24  (but he is not 24 years old technically , so we need to decrease 24 by 1 ) actual age ==> 23
// for date conditions the moths of dob and today should be same [MONTHS SHOULD BE EQUALS]
