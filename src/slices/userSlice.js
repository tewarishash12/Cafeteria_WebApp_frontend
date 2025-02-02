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
        },
        setMerchants: (state, {payload}) =>{
            const newMerchant = state.customerList.find((data) => data._id === payload.id)
            newMerchant.role = "merchant";
            state.customerList = state.customerList.filter((customer) => customer._id !== payload.id);
            state.merchantList.push(newMerchant);
        },
        setCustomers: (state, {payload}) =>{
            const newCustomer = state.merchantList.find((data)=> data._id === payload.id)
            newCustomer.role = "customer";
            state.merchantList = state.merchantList.filter((customer) => customer._id !== payload.id);
            state.customerList.push(newCustomer);
        }
    }
})

export const { allUsersList,setMerchants,setCustomers } = userSlice.actions
export default userSlice.reducer;