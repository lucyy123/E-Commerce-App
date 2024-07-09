import { Product } from './../../../backend/src/models/product';
export type User = {
  name: string;
  email: string;
  photo: string;
  dob: string;
  role: string;
  _id: string;
  gender: string;
};

export type Product = {
  _id: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
  createdAt:string;
  updatedAt:string;
};
