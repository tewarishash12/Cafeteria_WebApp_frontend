import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        currentUser: null,
    },
    reducers: {
        setCurrentUser: (state,{payload}) =>{
            state.currentUser = payload.userInfo;
        },
        removeCurrentUser: (state) =>{
            state.currentUser = null;
        }
    }
})

export const { setCurrentUser, removeCurrentUser } = authSlice.actions;
export default authSlice.reducer;