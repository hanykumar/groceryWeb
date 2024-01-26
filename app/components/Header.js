'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const cart = useSelector(state => state.productReducer.cart);
    useEffect(() => {
        console.log(cart.length)
    }, [cart])
    return (
        <nav className="flex justify-between bg-black p-3">
            <div>
                icon
            </div>
            <div>
                menulist = {cart.length}
            </div>
        </nav>
    )
}

export default Header;