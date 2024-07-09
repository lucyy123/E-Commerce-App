import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { User } from "../../types/types";
import { userMessageResponse, userResponse } from "../../types/userApiTypes";

const userbaseURL = `${import.meta.env.VITE_SERVER}/api/v1/user/`;
export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: userbaseURL }),
  endpoints: (builder) => ({
    login: builder.mutation<userMessageResponse, User>({
      query: (user) => ({
        method: "POST",
        url: "new",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation } = userAPI;

export const getUser = async (id: string) => {
  try {
    const { data }: { data: userResponse } = await axios.get(`${userbaseURL}${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
