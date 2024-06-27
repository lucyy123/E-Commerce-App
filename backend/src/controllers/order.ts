import { TryCatch } from "../middlewares/error.js";
import { Response, Request, NextFunction } from "express";
import { newOrderReqBody } from "../types/types.js";
import ErrorHandler from "../utils/errorHandlerClass.js";
import { Order } from "../models/order.js";
import { invalidateCatch } from "../utils/invalidateCache.js";
import { myCache } from "../app.js";

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

    if (!orderItems || !user || !tax || !total || !subTotal || !shippingInfo)
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
      product: true,
      order: true,
      admin: true,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
    });
  }
);



export const myOrders = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  //! we are passing the id in the QUERY
  const key = `myOrders-${id}`;

  let myOrder = [];

  if (myCache.has(key)) myOrder = JSON.parse(myCache.get(key)!);
  else {
    myOrder = await Order.find({ user: id });
    myCache.set(key, JSON.stringify(myOrder));
  }

  return res.status(200).json({
    success: true,
   myOrder
  });
});



export const getAllOrders = TryCatch(async (req, res, next) => {


  let orders = [];
  const key='admin-orders';

  if (myCache.has(key)) orders = JSON.parse(myCache.get(key)!);
  else {
    orders = await Order.find().populate("user","name");
    myCache.set(key, JSON.stringify(orders));
  }

  return res.status(200).json({
    success: true,
   orders
  });
});



export const getSingleOrder = TryCatch(async (req, res, next) => {
const { id }= req.params
//! we are passing the id in the PARAMETERS


  let order;
// ** IMPORTANT**   if we take order={ } or order =[ ], so we defined its type 
// *which might be possible that will shown error that is why i let order be as defined [not assigned yet]

  const key=`order-${id} `;

  if (myCache.has(key)) order = JSON.parse(myCache.get(key)!);
  else {
    order = await Order.findById(id).populate("user","name");
    if(!order) return next (new ErrorHandler("Order not found",404))
    myCache.set(key, JSON.stringify(order));
  }

  return res.status(200).json({
    success: true,
    order
  });
});

export const processOrder = TryCatch(async(req,res,next)=>{

const {id} = req.params

const order= await Order.findById(id)

if(!order) return next(new ErrorHandler("Order not found",404));

switch (order.status) {
  case "Processing":
    order.status="Shipped"
    break;
  case "Shipped":
    order.status="Delivered"
    break;

  default:
    order.status ="Delivered"
    break;
}

await order.save();

await invalidateCatch({product:false,order:true,admin:true})

return res.status(200).json({
success:true,
message:"Order processed Successfully"
})

})

export const deleteOrder = TryCatch(async(req,res,next)=>{

const {id} = req.params

const order= await Order.findById(id)

if(!order) return next(new ErrorHandler("Order not found",404));


await order.deleteOne();
await invalidateCatch({product:false,order:true,admin:true})

return res.status(200).json({
success:true,
message:"Order deleted Successfully"
})

})