import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductModel from '../model/ProductModel'

const fetchProducts = createAsyncThunk('ProductSlice/fetchProducts',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try{
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            const products = data.map((product) => new ProductModel(product.id, product.title, product.description, product.image, product.price));
            return products;
        }
        catch(err){
            return rejectWithValue(err.message)
        }
})
export {fetchProducts}