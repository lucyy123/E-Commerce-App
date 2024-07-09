import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./apis/userApi";
import { productAPI } from './apis/productApi';
import { userReducer } from "./reducer/userReducer";

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [userReducer.name]: userReducer.reducer,
    },
    middleware: (gDM) => gDM().concat(userAPI.middleware, productAPI.middleware)
    // gDM= Get Default Middlewares
});