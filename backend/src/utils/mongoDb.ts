import mongoose from "mongoose";

export const connnectDb = () => {
  mongoose
    .connect("mongodb://0.0.0.0:27017", {
      dbName: "Ecommerce_24",
    })
    .then((res) => console.log(`DB connected to ${res.connection.host}`))
    .catch((error) => console.log(`error is to connnect DB ${error}`));
};
