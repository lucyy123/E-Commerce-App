import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./apis/userApi";

export const strore =configureStore({
    reducer:{
        userAPI:userAPI.reducer,
    },
    middleware: (gDM) => gDM().concat(userAPI.middleware)
// gDM= Get Default Middlewares
});