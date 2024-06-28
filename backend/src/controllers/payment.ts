import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import ErrorHandler from "../utils/errorHandlerClass.js";

export const newCoupon = TryCatch(async (req, res, next) => {
  const { discountAmount, couponCode } = req.body;

  if (!discountAmount || !couponCode)
    return next(new ErrorHandler("Please enter all field", 404));

  const coupon = await Coupon.create({
    discountAmount,
    couponCode,
  });

  return res.status(201).json({
    success: true,
    message: `coupon ${couponCode}created successfully`,
  });
});

export const applyDiscount = TryCatch(async (req, res, next) => {
  const {couponCode}= req.query;

  const validCouponDiscount= await Coupon.findOne({couponCode});

  if(!validCouponDiscount) return next(new ErrorHandler("Invalid Coupon code",400))

  return res.status(201).json({
    success: true,
    message: validCouponDiscount.discountAmount
  });
});





export const singleCoupon =TryCatch(async(req,res,next)=>{

const {id} = req.params

   const coupon =await Coupon.findById(id);

    if(!coupon) return next(new ErrorHandler("Coupon not found",400))

 
return res.status(200).json({
  succsess:true,
coupon
})
});



export const getAllCoupons =TryCatch(async(req,res,next)=>{


   const coupons =await Coupon.find({});
    if(!coupons) return next(new ErrorHandler("No Coupons Available",400))

 
return res.status(200).json({
  succsess:true,
  coupons
})
});


export const deleteCoupon =TryCatch(async(req,res,next)=>{

const {id} = req.params

   const coupon =await Coupon.findById(id);

    if(!coupon) return next(new ErrorHandler("Coupon not found",400))
await coupon.deleteOne()

 
return res.status(200).json({
  succsess:true,
message:"Coupon deleted successfully"
})
});


