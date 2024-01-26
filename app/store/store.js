import { thunk } from "redux-thunk";
import productSlice from "./productSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        productReducer: productSlice
    },
    middleware: () => [thunk]
})

