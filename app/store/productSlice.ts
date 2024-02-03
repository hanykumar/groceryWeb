import { PayloadAction,createAction,createSlice } from "@reduxjs/toolkit";
import ProductModel from "../model/ProductModel";

export interface AppState {
  products: ProductModel[],
  loading: boolean,
  cart: ProductModel[],
  product: ProductModel | null,
}
const initialState: AppState = {
  products: [],
  loading: false,
  cart: [],
  product: null,
};

const setProducts = createAction<ProductModel[]>('ProductSlice/fetchProducts/fulfilled')
type SetProductsAction = ReturnType<typeof setProducts>


const setProduct = createAction<ProductModel>('ProductSlice/fetchProductDetails/fulfilled')
type SetProductAction = ReturnType<typeof setProduct>

const slice = createSlice({
  name: 'ProductSlice',
  initialState: initialState,
  reducers: {
    addToCart: (state: AppState, action: PayloadAction<{product: ProductModel, quantity: number, operation: string}>) => {
      const { product, quantity, operation } = action.payload;
      switch (operation) {
        case 'add':
          const existingProductIndex = state.cart.findIndex(item => item.id === product.id);

          if (existingProductIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingProductIndex].quantity += quantity;
            state.cart = updatedCart;
          } else {
            const newCartItem = { ...product, quantity };
            state.cart = [...state.cart, newCartItem];
          }

          // Update quantity for the single product in state.product
          state.product = product;
          const updatedProduct = { ...state.product, quantity: (state.product.quantity || 0) + quantity };
          state.product = updatedProduct;

          break;

        case 'remove':
          const productIndexToRemove = state.cart.findIndex(item => item.id === product.id);

          if (productIndexToRemove !== -1) {
            const updatedCart = [...state.cart];

            if (quantity > 0 && quantity < updatedCart[productIndexToRemove].quantity) {
              updatedCart[productIndexToRemove].quantity -= quantity;
            } else {
              updatedCart.splice(productIndexToRemove, 1);
            }

            state.cart = updatedCart;

            // Update quantity for the single product in state.product
            state.product = product;
            const updatedProduct: ProductModel | null = { ...state.product, quantity: (state.product.quantity || 0) - quantity };
            state.product = updatedProduct;
          }
          break;

        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase('ProductSlice/fetchProducts/pending', (state) => {
        state.loading = true;
      })
      .addCase(setProducts.type, (state, action: SetProductsAction) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase('ProductSlice/fetchProducts/rejected', (state) => {
        state.loading = false;
      })
      .addCase('ProductSlice/fetchProductDetails/pending', (state) => {
        state.loading = true;
      })
      .addCase(setProduct.type, (state, action: SetProductAction) => {
        const { id } = action.payload;

        const cartProduct = state.cart.find(item => item.id === id);
        state.product = {
          ...action.payload,
          quantity: cartProduct ? cartProduct.quantity : 0,
        };
        state.loading = false;
      })
      .addCase('ProductSlice/fetchProductDetails/rejected', (state: AppState) => {
        state.loading = false;
      });
  },
});

export const { addToCart } = slice.actions;
export default slice.reducer;
