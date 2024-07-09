import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = `${import.meta.env.VITE_SERVER}/api/v1/product/`;

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    latestProducts: builder.query({
      query: () => "latest",
    }),
  }),
});

export const { useLatestProductsQuery} = productAPI