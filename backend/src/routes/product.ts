import { AdminOnly } from './../middlewares/auth.js';
import exp from "constants"
import express from "express"
import { singleUpload } from '../middlewares/multer.js';
import { getlatestProducts, newProduct,getGategories,AdminProducts,deleteProduct,updateProduct,singleProduct } from '../controllers/product.js';

const app =express.Router();

//single upload :-  used to upload the single image


// post the new products  endpoint :- api/v1/product/new
app.post("/new",AdminOnly,singleUpload,newProduct);
// get the latest added products s  endpoint :- api/v1/product/lates
app.get("/latest",getlatestProducts)
// post the new products  endpoint :- api/v1/product/category
app.get("/category",getGategories)
// post the new products  endpoint :- api/v1/product/admin-products
app.get("/admin-products",AdminOnly,AdminProducts)

// to get the product, delete, and update
app.route("/:id").get(singleProduct).put(AdminOnly,singleUpload,updateProduct).delete(AdminOnly, deleteProduct)


export default app;