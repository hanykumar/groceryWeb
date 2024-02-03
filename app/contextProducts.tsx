import { createContext, useContext, useState } from "react";
import ProductModel from "./model/ProductModel";

interface ProductContextProps {
    products: ProductModel[];
    setProducts(products: ProductModel[]): void;
}

const initialValue: ProductContextProps = {
    products: [],
    setProducts: () => { console.log("Dummy Set Product") }
}

const ProductContext = createContext(initialValue)

const ProductProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [products, dispatch] = useState<ProductModel[]>([]);

    const setProducts = (value: ProductModel[]) => {
        console.log(value)
        dispatch(value)
    }

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;

export const useProductsContext = () => useContext(ProductContext)
