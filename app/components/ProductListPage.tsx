import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { StoreState, useAppDispatch } from '../store/store';
import { useProductsContext } from '../contextProducts';
import { fetchProducts } from '../service/productService';
import ProductList from './ProductList';

export default function ProductListPage() {
    const products = useSelector((state: StoreState) => state.productReducer.products);
    const loading = useSelector((state: StoreState) => state.productReducer.loading);
    const dispatch = useAppDispatch();
  
    const { setProducts } = useProductsContext();
  
    useEffect(() => {
      if (!products.length) {
        dispatch(fetchProducts());
      }
      setProducts(products)
    }, [dispatch, products]);
  
    const memoizedProductList = useMemo(() => {
      return <ProductList isCartItem={false} />;
    }, [products]);
  return (
    <div>
      <div className='text-2xl mb-5'>Products</div>
      {loading ? <div>Loading...</div> : memoizedProductList}
    </div>
  )
}
