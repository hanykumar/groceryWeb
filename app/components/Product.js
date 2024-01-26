import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/productSlice'
import { useRouter } from 'next/navigation';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const addToCartHandler = () => {
    dispatch(addToCart({ product: product, quantity: 1, operation: 'add' }))
  }
  const removeFromCartHandler = () => {
    dispatch(addToCart({ product: product, quantity: 1, operation: 'remove' }))
  }
  const addToCartHandlerAndNavigate = () => {
    dispatch(addToCart({ product: product, quantity: 1, operation: 'add' }))
    // router.push('/cart')
  }

  return (
    <div className='flex flex-col bg-gray-900 p-4 rounded'>
      <div className='grid grid-cols-4 gap-4 mb-3'>
        <div className='col-span-1 relative' style={{ width: 100, height: 100 }}>
          <Image priority={true} alt={product.title} src={product.image} layout={'fill'} objectFit={'contain'} />
        </div>
        <div className='col-span-3'>
          <h3>{product.title}</h3>
          <p>${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4 ' >
        <div className='col-span-3 line-clamp-2'>Quantity: {product.description}</div>
        {/* <p>Quantity: {product.quantity}</p> */}
        {
          product.quantity ?
            <div className='flex items-center' >
              <button className='p-2 border rounded' onClick={removeFromCartHandler}>
                -
              </button>
              <div className='p-2'>
                {product.quantity}
              </div>
              <button className='p-2 border rounded' onClick={addToCartHandler}>
                +
              </button>
            </div>
            :
            <button className='bg-orange-700 color-white rounded col-span-1'
              onClick={addToCartHandlerAndNavigate}>Add to Cart</button>
        }
      </div>
    </div>
  );
};

export default Product;
