import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import cartReducer from "../slices/cartSlice"
import dishReducer from "../slices/dishSlice"

export default configureStore({
    reducer:{
        auth: authReducer,
        cart: cartReducer,
        dish: dishReducer
    }
})