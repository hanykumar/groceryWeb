'use client';
import { useEffect } from "react";
import { fetchProductDetails } from '../../service/productService'
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { addToCart } from "@/app/store/productSlice";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const router = useRouter()
    const product = useSelector(state => state.productReducer.product)
    const loading = useSelector(state => state.productReducer.loading)
    const addToCartHandler = () => {
        dispatch(addToCart({ product: product, quantity: 1, operation: 'add' }))
    }
    const removeFromCartHandler = () => {
        dispatch(addToCart({ product: product, quantity: 1, operation: 'remove' }))
    }
    const addToCartHandlerAndNavigate = () => {
        dispatch(addToCart({ product: product, quantity: 1, operation: 'add' }))
    }
    const buyNow = () => {
        if (product.quantity == 0) {
            addToCartHandler()
        }
        router.push(`/cart`)
    }

    useEffect(() => {
        const productId = params.id;
        if (!product || product.id !== productId) {
            dispatch(fetchProductDetails(productId));
        }
    }, [params.id]);

    if (loading) {
       return <div className="mt-5 pt-5">
            Loading...
        </div>
    }
    else
        if (product)
            return (
                <div className='flex flex-col mt-5 rounded-lg'>
                    <div className='grid lg:grid-cols-8 gap-5 mb-3'>
                        <div className='lg:col-span-3 relative bg-neutral-700 rounded-lg' style={{ height: '400px' }}>
                            <Image priority={true} alt={product.title} src={product.image} layout={'fill'} objectFit={'contain'} />
                        </div>
                        <div className='lg:col-span-5'>
                            <h3 className='text-xl text-gray-200'>{product.title}</h3>
                            <p className='text-gray-400'>${product?.price?.toFixed(2)}</p>
                            <div className='col-span-1 text-gray-300 mt-4'>{product.description}</div>
                        </div>

                    </div>
                    <div className='grid grid-cols-2 gap-4 mt-3' >
                        <button onClick={buyNow}
                            className=" col-span-1 w-100 bg-green-800 hover:bg-green-700 px-5 py-4 rounded-lg ">
                            Buy now
                        </button>
                        {
                            product.quantity ?
                                <div className='flex items-center justify-end col-span-1' >
                                    <button className='bg-neutral-600 hover:bg-neutral-700 px-3 py-2 rounded' onClick={removeFromCartHandler}>
                                        -
                                    </button>
                                    <div className='px-4'>
                                        {product.quantity}
                                    </div>
                                    <button className='bg-neutral-600 hover:bg-neutral-700 px-3 py-2 rounded' onClick={addToCartHandler}>
                                        +
                                    </button>
                                </div>
                                :
                                <button className='col-span-1 px-5 py-4 bg-neutral-700 hover:bg-neutral-600  color-white rounded '
                                    onClick={addToCartHandlerAndNavigate}>Add to Cart</button>
                        }

                    </div>
                </div>
            );
        else
            return <div>No product found!</div>
}
export default ProductDetails;