'use client';
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const cart = useSelector(state => state.productReducer.cart);
    useEffect(() => {
        console.log(cart.length)
    }, [cart])
    return (
        <nav className="flex justify-between bg-gray-600 p-3">
            <div>
                Hello Hany Kumar
            </div>
            <div>
            <Link href="/cart" className="underline border rounded p-2">
                Cart items {cart.length}
                </Link>
            </div>
        </nav>
    )
}

export default Header;