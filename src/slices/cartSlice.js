import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        setCart: (state, { payload }) => {
            state.items = payload.cart;
        },
        addItem: (state, { payload }) => {
            const existingItems = state.items.find(item => item._id === payload.food._id)

            if (!existingItems)
                state.items.push({ item:payload.food, quantity: 1 });
        },
        removeItem: (state, { payload }) => {
            state.items = state.items.filter(({item}) => item._id !== payload.id);
        },
        changeQuantity: (state,{payload}) =>{
            const cartItem = state.items.find(({item})=>item._id === payload.id);
            if(cartItem){
                cartItem.quantity += payload.count;
                if(cartItem.quantity <=0)
                    state.items = state.items.filter(({item}) => item._id !== payload.id) 
            }
        }
    }
})

export const { addItem, removeItem, setCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;