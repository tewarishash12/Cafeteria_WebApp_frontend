import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        customerList: [],
        merchantList: [],
    },
    reducers: {
        allUsersList: (state, { payload }) => {
            state.customerList = payload.customers;
            state.merchantList = payload.merchants;
        }
    }
})

export const { allUsersList } = userSlice.actions
export default userSlice.reducer;