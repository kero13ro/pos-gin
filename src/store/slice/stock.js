import { createSlice } from "@reduxjs/toolkit";

export const stockSlice = createSlice({
  name: "stock",
  initialState: {
    stockList: [],
  },
  reducers: {
    updateStock: (state, action) => {
      state.stockList = action.payload;
    },
    addStock: (state, action) => {
      state.stockList.push(action.payload);
    },
  },
});

export const { updateStock, addStock } = stockSlice.actions;

export default stockSlice.reducer;
