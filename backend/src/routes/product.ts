import { AdminOnly } from './../middlewares/auth.js';
import exp from "constants"
import express from "express"
import { singleUpload } from '../middlewares/multer.js';
import { newProduct } from '../controllers/product.js';

const app =express.Router();

//single upload :- 

app.post("/new",singleUpload,newProduct);



export default app;