import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "store/slice/stock";

export default configureStore({
  reducer: {
    stock: stockReducer,
  },
});
