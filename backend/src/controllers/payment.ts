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
    message: `coupon "${couponCode}" 
     created successfully`,
  });
});
