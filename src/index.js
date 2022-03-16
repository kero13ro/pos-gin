import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Restock from "./components/Restock";
import Checkout from "./components/Checkout";
import Search from "./components/Search";
import "./index.scss";
import "antd/dist/antd.min.css";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/pos-gin">
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Restock />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<p className="ma-16">網址輸入錯誤</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
