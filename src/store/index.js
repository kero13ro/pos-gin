import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slice/stock";

export default configureStore({
  reducer: {
    stock: stockReducer,
  },
});
