'use client';
import { useSelector } from "react-redux";
import ProductList from '../components/ProductList'
import { useEffect } from "react";

const Cart  = () => {
    const cart = useSelector(state => state.productReducer.cart);
    return (
        <ProductList products={cart.filter(item => item.quantity > 0)}/>
    )
}
export default Cart;