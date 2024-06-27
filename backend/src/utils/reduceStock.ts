import { error } from 'console';
import { Product } from './../models/product.js';
import { orderItems } from './../types/types.js';


export const reduceStock = async (orderItems: orderItems[]) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i]
        const product = await Product.findById(order.productId)
        if (!product) throw new Error("Product not found");
        product.stock -= order.quantity;
        await product.save();
    }

}
