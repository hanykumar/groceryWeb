'use client';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import { useEffect, useMemo } from 'react';
import { fetchProducts } from './service/productService';
import { StoreState, useAppDispatch } from './store/store';

export default function Home() {
  const products = useSelector((state: StoreState) => state.productReducer.products);
  const loading = useSelector((state: StoreState) => state.productReducer.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const memoizedProductList = useMemo(() => {
    return <ProductList isCartItem={false} products={products} />;
  }, [products]);

  return (
    <div>
      <div className='text-2xl mb-5'>Products</div>
      {loading ? <div>Loading...</div> : memoizedProductList}
    </div>
  );
}
