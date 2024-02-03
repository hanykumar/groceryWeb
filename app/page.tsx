'use client';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { fetchProducts } from './service/productService';
import { StoreState, useAppDispatch } from './store/store';
import ProductProvider, { useProductsContext } from './contextProducts';
import ProductListPage from './components/ProductListPage';

export default function Home() {

  return (
    <ProductProvider>
      <ProductListPage />
    </ProductProvider>
  );
}
