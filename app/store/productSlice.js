const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  products: [],
  loading: false,
  cart: [],
  product: {},
};

const slice = createSlice({
  name: 'ProductSlice',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
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
            const updatedProduct = { ...state.product, quantity: (state.product.quantity || 0) - quantity };
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
      .addCase('ProductSlice/fetchProducts/fulfilled', (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase('ProductSlice/fetchProducts/rejected', (state) => {
        state.loading = false;
      })
      .addCase('ProductSlice/fetchProductDetails/pending', (state) => {
        state.loading = true;
      })
      .addCase('ProductSlice/fetchProductDetails/fulfilled', (state, action) => {
        const { id } = action.payload;

      const cartProduct = state.cart.find(item => item.id === id);

      state.product = {
        ...action.payload,
        quantity: cartProduct ? cartProduct.quantity : 0, 
      };


        state.loading = false;
      })
      .addCase('ProductSlice/fetchProductDetails/rejected', (state) => {
        state.loading = false;
      });
  },
});

export const { addToCart } = slice.actions;
export default slice.reducer;
