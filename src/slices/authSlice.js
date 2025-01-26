import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        currentUser: null,
    },
    reducers: {
        setCurrentUser: (state,{payload}) =>{
            state.currentUser = payload.userInfo.username;
        },
        removeCurrentUser: (state, {payload}) =>{
            state.currentUser = null;
        }
    }
})

export const { setCurrentUser, removeCurrentUser } = authSlice.actions;
export default authSlice.reducer;