"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import React, { ReactNode } from "react";

interface props {
    children: React.ReactNode
}

const Providers: React.FC<props> = ({children}) => {
    return <Provider store={store}>
        {children}
    </Provider>
}
export default Providers;