import  express from "express";
import { newUser } from "../controllers/user.js";


const route = express.Router()

// route -> /api/v1/user/new

route.post("/new",newUser)

export default route