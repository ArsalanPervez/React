import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: []
    },
    reducers: {
        getAllproduct: (state, action) => {
            state.product = action.payload;
        },
    }
})

export const {getAllproduct} = productSlice.actions
export default productSlice.reducer