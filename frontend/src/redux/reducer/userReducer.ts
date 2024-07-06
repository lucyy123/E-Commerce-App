import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducerInitState } from "../../types/apiTypes";
import { User } from "../../types/types";


// create the reducer//
// defined initial state
// create slice
// mention slice name
// mentioned initial state
// defined the reducers 
// take the state and actions parameters
const initialState: UserReducerInitState = {
    loading: true,
    user: null
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        userExist: (state, action: PayloadAction<User>) => {
            state.loading = false,
                state.user = action.payload
        },
        userNotExist: (state) => {
            state.loading = false,
                state.user = null
        }
    }
});

export const {userExist,userNotExist} = userReducer.actions