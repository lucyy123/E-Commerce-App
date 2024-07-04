import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import { userMessageResponse } from "../../types/apiTypes";


export const userAPI = createApi({
    reducerPath:"userAPI",
    baseQuery:fetchBaseQuery({baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/user/`}),
   endpoints:(builder)=>({
    login:builder.mutation<userMessageResponse,User>({
        query:(user)=>({
            method:'POST',
            url:"new",
            body:user
        })
    })
   })

})

export const {useLoginMutation} = userAPI