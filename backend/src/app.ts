import express from "express";
import { connnectDb } from "./utils/mongoDb.js";
import { errorMiddleWare } from "./middlewares/error.js";

// importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js"


const port = 4000;
const app = express();
connnectDb();

// this is one middleware
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
