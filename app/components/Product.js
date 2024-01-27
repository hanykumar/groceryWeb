import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/productSlice'
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons/faDeleteLeft';
import { faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Product = ({ product, cartItem }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const addToCartHandler = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product: product, quantity: 1, operation: 'add' }))
  }
  const removeFromCartHandler = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product: product, quantity: 1, operation: 'remove' }))
  }
  const addToCartHandlerAndNavigate = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product: product, quantity: 1, operation: 'add' }))
  }
  const deleteFromCartHandler = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product: product, quantity: product.quantity, operation: 'remove' }))
  }
  const getProduct = () => {
    router.push(`/products/${product.id}`)
  }

  return (
    <div className='flex flex-col p-5 rounded-lg bg-neutral-900 hover:bg-neutral-800' >
      <Link href={`/products/${product.id}`} className='grid grid-cols-4 gap-4 mb-3'>
        <div className='col-span-1 relative bg-neutral-800 rounded-lg flex justify-center' >
          <Image alt={product.title} src={product.image} height={100} width={100} className='object-contain' />
        </div>
        <div className='col-span-3'>
          <div className='text-left'>
            <h3 className='text-xl text-gray-200'>{product.title}</h3>
            <p className='text-gray-400'>${product.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
      <div className='grid grid-cols-4 gap-1'>
        {
          !cartItem ?
            <div className='col-span-3 text-left text-sm line-clamp-2 text-gray-300'>{product.description}</div>
            : <div className="col-span-1"></div>
        }
        {product.quantity ? (
          <div className='col-span-1 flex items-center'>
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


          </div>
        ) : (
          <div className='col-span-1'>
            <button className='bg-neutral-700 text-white hover:bg-neutral-600 rounded ' onClick={addToCartHandlerAndNavigate}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>

  );
};

export default Product;
