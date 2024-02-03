import { createAsyncThunk, AsyncThunk, AsyncThunkAction } from "@reduxjs/toolkit";
import ProductModel from '../model/ProductModel'

const fetchProducts = createAsyncThunk('ProductSlice/fetchProducts',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            const products:ProductModel[] = data.map((product: any) => new ProductModel(
                {
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    quantity: 0
                }));
            return products;
        }
        catch (err: any) {
            return rejectWithValue(err.message)
        }
    })
const fetchProductDetails: AsyncThunk<ProductModel, string, any> = createAsyncThunk('ProductSlice/fetchProductDetails',
    async (id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            const product = new ProductModel(
                {
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    price: data.price,
                    quantity: 0
                });
                console.log(product)
            return product;
        }
        catch (err: any) {
            return rejectWithValue(err.message)
        }
    })
export { fetchProducts, fetchProductDetails }