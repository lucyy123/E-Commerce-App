import  express from "express";
import { newUser,getAllUsers, getUserbyID, deleteUser } from "../controllers/user.js";


const app = express.Router()

//  Route -> /api/v1/user/new
//  create new user
app.post("/new",newUser)



//  Route -> /api/v1/user/all
//  get all users
app.get("/all",getAllUsers)

  // ----  Common Method--------
  // if the route is same then we can optimize the code
 //  Route -> /api/v1/user/UserID
///  get user by  ID

// app .get("/:id",getUserbyID)

 //  Route -> /api/v1/user/UserID
 //  delete user by  ID

// app.get("/:id",deleteUser)


//------------OPTIMIZED VERSION---------------

app.route("/:id").get(getUserbyID).delete(deleteUser)




export default app