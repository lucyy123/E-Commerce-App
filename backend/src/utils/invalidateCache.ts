import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { InvalidateCatheProps } from "../types/user.js";

export const invalidateCatch = async ({product,order,admin}:InvalidateCatheProps)=>{
if(product){
    
    const productKeys:string[]=["admin-products","categories","latesProducts"]
    const products= await Product.find({}).select("_id")
    console.log('products:', products) 
    products.forEach((ele)=> productKeys.push(`product-${ele.id}`))
    myCache.del(productKeys)
    
}

if(order){

}

if(admin){

}
}

