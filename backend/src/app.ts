import express from "express";
import { connnectDb } from "./utils/mongoDb.js";
import userRoute from "./routes/user.js";

const port = 4000;
const app = express();
connnectDb();

app.use(express.json());
app.get("/", () => {
  console.log("API is working with api/v1");
});

// USING ROUTES

app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
