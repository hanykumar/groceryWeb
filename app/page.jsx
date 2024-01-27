'use client';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './components/ProductList'
import { useEffect } from 'react';
import { fetchProducts } from './service/productService';

export default function Home() {
  const products = useSelector(state => state.productReducer.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  return (
    <div>
      <div className='text-2xl mb-5'>Products</div>
      <ProductList products={products} />
    </div>
  );
}
