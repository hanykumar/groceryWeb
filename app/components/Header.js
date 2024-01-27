'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

const Header = () => {
    const cart = useSelector(state => state.productReducer.cart);
    const router = usePathname();
    const title = () => {
        if (router == '/cart')
            return 'Cart'
        else if (router == '/')
            return 'Products'
    }
    return (
        <nav className="flex justify-between items-center bg-neutral-800 px-10 py-4 
        fixed top-0 left-0 right-0 z-10">
            <div className="text-lg">
               <Link href='/'> <FontAwesomeIcon icon={faUser}/></Link>
            </div>
            <div className="text-3xl">
                {/* {title()} */}
            </div>
            <div>
                {
                    title() !== 'Cart' && cart.length > 0 &&
                    <Link href="/cart" className="rounded px-3 py-2 hover:bg-gray-700">
                        <FontAwesomeIcon className="pr-3" icon={faCartShopping} />
                        {cart.length}
                    </Link>
                }
            </div>
        </nav>
    )
}

export default Header;