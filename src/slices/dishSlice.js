import { createSlice } from "@reduxjs/toolkit";

const dishSlice = createSlice({
    name: "dish",
    initialState: {
        fullMenu: [],
        filteredMenu: []
    },
    reducers: {
        setCompleteMenu: (state, {payload}) =>{
            state.fullMenu = payload.menu;
            state.filteredMenu = payload.menu;
        },
        setMenuByCounter: (state, {payload}) =>{
            state.filteredMenu = state.fullMenu.filter(dish=> dish._id === payload._id)
        }
    }
})

export const { setCompleteMenu, setMenuByCounter } = dishSlice.actions;
export default dishSlice.reducer;