import express from "express";
import { connnectDb } from "./utils/mongoDb.js";
import userRoute from "./routes/user.js";
import { errorMiddleWare } from "./middlewares/error.js";

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


// to check the error after route
app.use(errorMiddleWare)

app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
