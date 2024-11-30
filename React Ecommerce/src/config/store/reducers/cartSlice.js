import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addItem: (state, action) => {
            const index = state.cart.findIndex(item=> item.id == action.payload.id)
            if(index === -1){
                action.payload.quantity = 1;
                state.cart.push(action.payload)
            }
            else{
                state.cart[index].quantity += 1;
            }
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
        
    }
})

export const {addItem, removeItem} = cartSlice.actions
export default cartSlice.reducer