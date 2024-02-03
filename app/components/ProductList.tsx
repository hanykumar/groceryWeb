// Import necessary dependencies
import React, { useState } from 'react';
import Product from './Product';
import ProductModel from '../model/ProductModel';

interface props {
  products: ProductModel[],
  isCartItem: boolean
}

const ProductList = ({ products , isCartItem}: props) => {
  const productsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const pages = Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => index);


  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        {currentProducts.map((product, index) => (
          <Product isCartItem={isCartItem} key={index} product={product} />
        ))}
      </div>

      {products.length > productsPerPage && (
        <div className="flex justify-center my-10">
          {pages.map((page) => (
            <button
              key={page}
              className={`mx-2 py-2 px-4 ${
                currentPage === page + 1 ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-800'
              } rounded-lg`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
