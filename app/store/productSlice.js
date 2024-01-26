const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    products: [],
    loading: false,
    cart: [],
}

const slice = createSlice({
    name: 'ProductSlice',
    initialState: initialState,
    reducers: {
      addToCart: (state, action) => {
            const { product, quantity, operation } = action.payload;
            console.log({ product, quantity , operation } )
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
                }
                break;
          
              default:
                break;
            }
          }
    },
    extraReducers: (builder) => {
        builder
            .addCase('ProductSlice/fetchProducts/pending', (state) => {
                state.loading = true
            })
            .addCase('ProductSlice/fetchProducts/fulfilled', (state, action) => {
                state.products = action.payload;
                state.loading = false
            })
            .addCase('ProductSlice/fetchProducts/rejected', (state) => {
                state.loading = false
            })
    }
})
export const { addToCart } = slice.actions;
export default slice.reducer;