import { TryCatch } from "../middlewares/error.js";
import { Response, Request, NextFunction } from "express";
import { newOrderReqBody } from "../types/types.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
import { Order } from "../models/order.js";
import { invalidateCatch } from "../utils/invalidateCache.js";

export const newOrder = TryCatch(
  async (req: Request<{}, {}, newOrderReqBody>, res, next) => {
    const {
      shippingInfo,
      orderItems,
      user,
      tax,
      total,
      subTotal,
      discount,
      shippingCharges,
    } = req.body;

    if (
     
      !orderItems ||
      !user ||
      !tax ||
      !total ||
      !subTotal ||
   
      !shippingInfo
    )
      return next(new ErrorHandler("Please enter all fields", 400));

    const order = await Order.create({
      shippingInfo,
      orderItems,
      user,
      tax,
      total,
      subTotal,
      discount,
      shippingCharges,
    });

    // re-validating the cache - Why ==> [if an order is place then the products data will be affected that]

    await invalidateCatch({
        product:true,
        order:true,
        admin:true,
    })

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  }
);
