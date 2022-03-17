import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Restock from "./components/Restock";
import Checkout from "./components/Checkout";
import Search from "./components/Search";
import Layout from "./components/Layout";

import "antd/dist/antd.min.css";
import "./style/common.scss";
import "./style/utility.scss";
import "./style/vendor.scss";

function App() {
  return (
    <div className="root">
      <Provider store={store}>
        <BrowserRouter basename="/pos-gin">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Restock />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<p className="ma-16">網址輸入錯誤</p>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
