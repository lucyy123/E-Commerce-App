import { Product } from "./../models/product.js";
import { orderItems } from "./../types/types.js";
import { Document } from "mongoose";

export const reduceStock = async (orderItems: orderItems[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product not found");
    product.stock -= order.quantity;
    await product.save();
  }
};

export const calculatePercent = (lastMonth: number, currentMonth: number) => {
  let percentage;
  if (lastMonth == 0) {
    percentage = currentMonth * 100;
  } else {
    percentage = (currentMonth / lastMonth) * 100;
  }

  return Number(percentage.toFixed(0));
};

export const categoriesCountFunc = async ({
  categories,
  allProduct,
}: {
  categories: string[];
  allProduct: number;
}) => {
  /**
     ------- code break down -------
     Math.round((totalcategoriesArrya[index]/allProduct ) ) * 100
      
     
     fist we are getting the total number of categories we have
     let assuem we have 5 
     and we have the 50 products in total 
     
     ------- code logic --------
     and we want the percentage =  total categories we have / total product we have
     5/50 *100 = 10% 
     its mean we have only 10% of categries with respect to total products
     
    
     */

  const categoriesCountPromise = categories.map((category) =>
    Product.countDocuments({ category })
  );

  const totalcategoriesArray = await Promise.all(categoriesCountPromise);

  const categoryCount: Record<string, number>[] = [];

  categories.forEach((category, index) => {
    categoryCount.push({
      [category]: Math.round((totalcategoriesArray[index] / allProduct) * 100),
    });
  });
  return categoryCount;
};

interface MyDocument extends Document {
  createdAt: Date;
  discount?:number;
  total?:number

}

type charDataType = {
  length: number;
  docArr: MyDocument[];
  today: Date;
  property?:"discount" | "total";
};

export const chartData = ({ length, docArr, today , property}: charDataType) => {
  const data:number[]= new Array(length).fill(0);

  docArr.forEach((i) => {
    const orderCreationDate = i.createdAt;
    const monthDiffernce =
      (today.getMonth() - orderCreationDate.getMonth() + 12) % 12;
    //monthDiffernce<6 = product is created in last six month
    // array.length-1 == final index [zero index,first index,second index,third index,fourth index,final index]
    if (monthDiffernce < length) {
if(property){
  data[length - 1 - monthDiffernce] = data[length - 1- monthDiffernce ] + i[property]!;
}else{

  
  data[length - 1 - monthDiffernce] = data[length - 1- monthDiffernce ] + 1;
}
    }
  });
  return data
};
