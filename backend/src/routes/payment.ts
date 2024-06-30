

import express from "express"
import { AdminOnly } from "../middlewares/auth.js";
import { newCoupon,applyDiscount, getAllCoupons, deleteCoupon, singleCoupon ,newPaymentIntent} from "../controllers/payment.js";

const app =express.Router();


// create a new payment intent
// endPoint -->  api/v1/payment/create
app.post("/create",newPaymentIntent)

// create a new coupon
// endPoint -->  api/v1/payment/coupon/new
app.post("/coupon/new",AdminOnly,newCoupon)

// appling discount
// endPoint -->  api/v1/payment/discount
app.get("/discount",applyDiscount)

// get all coupons
// endPoint -->  api/v1/payment/coupon/all
app.get("/coupon/all",AdminOnly,getAllCoupons)

// get single coupon and delete coupon
// endPoint -->  api/v1/payment/coupon/:id
app.route("/coupon/:id").get(AdminOnly,singleCoupon).delete(AdminOnly,deleteCoupon)



export default app