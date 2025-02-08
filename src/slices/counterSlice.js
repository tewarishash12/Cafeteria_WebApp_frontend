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
            state.allCounters = state.allCounters.filter(( item ) => item._id !== payload.id);
        },
        updateCounter: (state,{payload}) =>{
            const index = state.allCounters.findIndex(counter => counter._id === payload.counter._id)

            if(index !== -1)
                state.allCounters[index] = payload.counter;
        }
    }
})

export const { setCounters,removeCounter,updateCounter } = counterSlice.actions;
export default counterSlice.reducer;