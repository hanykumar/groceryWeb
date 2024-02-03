import { thunk } from "redux-thunk";
import productSlice from "./productSlice";
import { useDispatch } from "react-redux";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        productReducer: productSlice
    },
    middleware: () => [thunk]//(getDefaultMiddleware: () => any[]) => getDefaultMiddleware().concat(thunk),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type StoreState = ReturnType<typeof store.getState>
