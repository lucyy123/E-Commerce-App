import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  discountAmount: {
    type: Number,
    required: [true, "Please enter discount Amount"],
  },

  couponCode: {
    type: String,
    required: [true, "Please enter coupon's code"],
    unique: true,
  },
});

export const Coupon = mongoose.model("Coupon", couponSchema);
