import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import productReducer from "./reducers/productSlice";


export default configureStore({
    reducer: {
        cart : cartReducer,
        product: productReducer
    },
    devTools: true
});