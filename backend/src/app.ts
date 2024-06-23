import express from "express";
import { connnectDb } from "./utils/mongoDb.js";
import { errorMiddleWare } from "./middlewares/error.js";
import nodecache from "node-cache"

// importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js"


const port = 4000;
const app = express();

// connecting to the mongo DB data base
connnectDb();

// caching the data

export const myCache=new nodecache();

// this is one middleware use to send the data from body of a request
app.use(express.json());


app.get("/", (req,res,next) => {
  console.log("API is working with api/v1");
return res.status(200).json({
  success:true,
  message:"API is working"
})
  
});

// USING ROUTES

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/uploads",express.static("uploads"))

// to check the error after route
app.use(errorMiddleWare)

app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
