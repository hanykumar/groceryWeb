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
            const { id, quantity=1 } = action.payload;
            const product = state.products.find(p => p.id === id);

            if (product) {
                const existingCartItem = state.cart.find(item => item.id === id);

                if (existingCartItem) {
                    existingCartItem.quantity += quantity;
                } else {
                    state.cart.push({ ...product, quantity });
                }
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