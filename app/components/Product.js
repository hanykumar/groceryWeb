import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import {addToCart} from '../store/productSlice'

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (productItem) => {
    dispatch(addToCart({id: productItem.id}))
  }
  return (
    <div className='flex flex-col bg-gray-900 p-4 rounded'>
      <div className='grid grid-cols-4 gap-4 mb-3'>
        <div className='col-span-1 relative' style={{width: 100, height: 100 }}>
          <Image alt={product.title} src={product.image} layout={'fill'} objectFit={'contain'} />
        </div>
        <div className='col-span-3'>
          <h3>{product.title}</h3>
          <p>${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4 ' >
        <div className='col-span-3 line-clamp-2'>Quantity: {product.description}</div>
        {/* <p>Quantity: {product.quantity}</p> */}
        <button className='bg-orange-700 color-white rounded col-span-1' onClick={() => addToCartHandler(product)}>Add to Cart</button>

      </div>
    </div>
  );
};

export default Product;
