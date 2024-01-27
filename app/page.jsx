'use client';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import { useEffect, useMemo } from 'react';
import { fetchProducts } from './service/productService';

export default function Home() {
  const products = useSelector((state) => state.productReducer.products);
  const loading = useSelector((state) => state.productReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const memoizedProductList = useMemo(() => {
    return <ProductList products={products} />;
  }, []);

  return (
    <div>
      <div className='text-2xl mb-5'>Products</div>
      {loading ? <div>Loading...</div> : memoizedProductList}
    </div>
  );
}
