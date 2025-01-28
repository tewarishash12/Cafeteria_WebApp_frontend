import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import cartReducer from "../slices/cartSlice"
import dishReducer from "../slices/dishSlice"
import counterReducer from "../slices/counterSlice"

export default configureStore({
    reducer:{
        auth: authReducer,
        cart: cartReducer,
        dish: dishReducer,
        counter: counterReducer
    }
})