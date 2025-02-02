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
        removeMenuItem: (state, { payload }) => {
            state.fullMenu = state.fullMenu.filter(( item ) => item._id !== payload.id);
        },
        setMenuByCounter: (state, {payload}) =>{
            state.filteredMenu = state.fullMenu.filter(dish=> dish.counter_id === payload.id)
        }
    }
})

export const { setCompleteMenu, removeMenuItem, setMenuByCounter } = dishSlice.actions;
export default dishSlice.reducer;