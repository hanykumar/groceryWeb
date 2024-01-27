'use client';
import { useSelector } from "react-redux";
import ProductList from '../components/ProductList'

const Cart = () => {
    const cart = useSelector(state => state.productReducer.cart);
    const deliveryCharges = 2;
    function calculateTotalPrice() {
        let totalPrice = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
        });

        return totalPrice;
    }

    return (
        <div className="flex flex-col justify-between">
            <div className='text-2xl mb-5'>Cart</div>
            {
                cart.length == 0 ? <div className="mt-5">Please add products to cart!</div> :
                    <div>
                        <ProductList products={cart.filter(item => item.quantity > 0)} />

                        <div className="mt-7 px-5 py-2 pb-5 rounded-lg bg-neutral-700 flex flex-col">
                            <div className="flex justify-between items-center my-1">
                                <p className="text-gray-300">Subtotal: </p>
                                <p>${calculateTotalPrice().toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between items-center my-1">
                                <p className="text-gray-300">Delivery Charges: </p>
                                <p>${2}</p>
                            </div>
                            <hr className="my-4" />
                            <div className="flex justify-between items-center my-1">
                                <p className="text-gray-300">Total: </p>
                                <p className="font-bold">${(calculateTotalPrice() + deliveryCharges).toFixed(2)}</p>
                            </div>
                            <button
                                className="w-100 bg-green-800 hover:bg-green-700 px-5 py-4 rounded-lg mt-2">
                                Proceed to Pay ${(calculateTotalPrice() + deliveryCharges).toFixed(2)}
                            </button>
                            
                        </div>
                    </div>
            }
        </div>
    )
}
export default Cart;