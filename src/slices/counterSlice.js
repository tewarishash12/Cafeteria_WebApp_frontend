import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        allCounters: []
    },
    reducers: {
        setCounters: (state, {payload}) => {
            state.allCounters = payload.counters
        }
    }
})

export const { setCounters } = counterSlice.actions;
export default counterSlice.reducer;