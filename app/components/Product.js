import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/productSlice'
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Product = ({ product, cartItem }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (e) => {
    dispatch(addToCart({ product: product, quantity: 1, operation: 'add' }))
  }
  const removeFromCartHandler = (e) => {
    dispatch(addToCart({ product: product, quantity: 1, operation: 'remove' }))
  }
  // const addToCartHandlerAndNavigate = (e) => {
  //   dispatch(addToCart({ product: product, quantity: 1, operation: 'add' }))
  // }
  const deleteFromCartHandler = (e) => {
    dispatch(addToCart({ product: product, quantity: product.quantity, operation: 'remove' }))
  }


  return (
    <div className='flex flex-col p-5 rounded-lg bg-neutral-900 hover:bg-neutral-800' >
      <div className='grid grid-cols-4 gap-4 mb-3'>
        <Link href={`/products/${product.id}`} className='col-span-1 relative bg-neutral-800 rounded-lg flex justify-center' >
          <Image alt={product.title} src={product.image} height={100} width={100} className='object-contain' />
        </Link>
        <div className='col-span-3'>
          <div className='text-left'>
            <Link href={`/products/${product.id}`}>
              <h3 className='text-xl text-gray-200'>{product.title}</h3>
              <p className='text-gray-400'>${product.price.toFixed(2)}</p>
            </Link>
            {
              product.quantity ?
              <div className='col-span-1 flex items-center justify-end'>
                <button
                  className=' hover:bg-red-300 hover:text-red-800 mr-2 px-3 py-2 rounded' onClick={deleteFromCartHandler}>
                  <FontAwesomeIcon icon={faTrashCan} color="neutral" />
                </button>
                <button
                  className='bg-neutral-600 hover:bg-neutral-700 px-3 py-2 rounded' onClick={removeFromCartHandler}>
                  -
                </button>
                <div className='px-3'>{product.quantity}</div>
                <button
                  className='bg-neutral-600 hover:bg-neutral-700 px-3 py-2 rounded' onClick={addToCartHandler}>
                  +
                </button>
              </div> : null
            }
          </div>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-1'>
        {
          !cartItem ?
            <div className='col-span-3 text-left text-sm line-clamp-3 text-gray-300'>{product.description}</div>
            : <div className="col-span-1"></div>
        }
        {product.quantity == 0 && (
          <div className='col-span-1 flex justify-end'>
            <button className='bg-neutral-700 text-white hover:bg-neutral-600 rounded px-3 py-2' onClick={addToCartHandler}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>

  );
};

export default Product;
