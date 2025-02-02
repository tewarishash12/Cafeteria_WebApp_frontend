import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        allCounters: []
    },
    reducers: {
        setCounters: (state, {payload}) => {
            state.allCounters = payload.counters
        },
        removeCounter: (state, { payload }) => {
            console.log(payload.id);
            state.fullMenu = state.allCounters.filter(( item ) => item._id !== payload.id);
        },
    }
})

export const { setCounters,removeCounter } = counterSlice.actions;
export default counterSlice.reducer;