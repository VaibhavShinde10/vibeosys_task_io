import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
  },
});

export const { addProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
