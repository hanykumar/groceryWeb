'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { fetchProducts} from '../service/productService'

const ProductList = ({products}) => {
    // const products = useSelector(state => state.productReducer.products);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(fetchProducts())
    // }, []);

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {
                products.map((product, index) => (
                    <Product key={index} product={product} />
                ))
            }
        </div>
    )
}
export default ProductList;