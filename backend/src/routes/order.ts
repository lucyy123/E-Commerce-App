import express from "express";
import { newOrder, myOrders, getAllOrders ,getSingleOrder,processOrder,deleteOrder} from "../controllers/order.js";
import { AdminOnly } from "../middlewares/auth.js";
const app = express.Router();

// create new order -->
// route ==> /api/v1/order/new
app.post("/new", newOrder);

// get user order  -->
// route ==> /api/v1/order/myOrder
app.get("/myOrder", myOrders);

// get all orders  -->
// route ==> /api/v1/order/myOrder
app.get("/all", AdminOnly, getAllOrders);


// get Single  order by its ID  -->
// route ==> /api/v1/order/:id

app.route("id").get(getSingleOrder).put(AdminOnly,processOrder).delete(AdminOnly,deleteOrder)

export default app;
