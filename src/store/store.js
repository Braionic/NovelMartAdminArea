import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/auth/userSlice"
import customerReducer from "./features/customers/customersSlice"



export const store = configureStore({
    reducer: {
        user: userReducer,
        customer: customerReducer
    }
})