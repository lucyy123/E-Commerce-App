import { myCache } from "../app.js";
import { Product } from "../models/product.js";
import { InvalidateCatheProps } from "../types/types.js";

export const invalidateCatch = async ({product,order,admin,userId,orderId,productId}:InvalidateCatheProps)=>{
if(product){
    
    const productKeys:string[]=["admin-products","categories","latesProducts",]
   
if(typeof productId==="string"){

    productKeys.push(`product-${productId}`)
} 

if( typeof productId==="object"){

    
    productId.forEach(ele => {
        const key=`product-${ele}`
        productKeys.push(key)
        console.log('product keys:', key)
    });
    
};


    myCache.del(productKeys)
    
}

if(order){
const ordersKey :string[]=['all-orders',`myOrders-${userId}`,`order-${orderId}`]

myCache.del(ordersKey)
}

if(admin){

}
}

