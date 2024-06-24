import mongoose from "mongoose";

export const connnectDb = (url:string) => {
  mongoose
    .connect(url, {
      dbName: "Ecommerce_24",
    })
    .then((res) => console.log(`DB connected to ${res.connection.host}`))
    .catch((error) => console.log(`error is to connnect DB ${error}`));
};
