'use client';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header'
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
    <main className="flex min-h-screen flex-col">
      <Header />
      <ProductList products={products} />
    </main>
  );
}
