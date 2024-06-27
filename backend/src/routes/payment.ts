

import express from "express"
import { AdminOnly } from "../middlewares/auth.js";
import { newCoupon } from "../controllers/payment.js";

const app =express.Router();


// create a new coupon
// endPoint -->  api/v1/payment/coupon/new
app.post("/coupon/new",newCoupon)



export default app