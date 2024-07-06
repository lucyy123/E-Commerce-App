import { errorMiddleWare } from './../../../backend/src/middlewares/error';
import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./apis/userApi";
import { userReducer } from "./reducer/userReducer";

export const strore =configureStore({
    reducer:{
        userAPI:userAPI.reducer,
        userReducer:userReducer.reducer
    },
    middleware: (gDM) => gDM().concat(userAPI.middleware)
// gDM= Get Default Middlewares
});