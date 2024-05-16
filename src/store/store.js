import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/auth/userSlice"
import customerReducer from "./features/customers/customersSlice"
import productReducer from "./features/product/productSlice"



export const store = configureStore({
    reducer: {
        user: userReducer,
        customer: customerReducer,
        product: productReducer,
    }
})