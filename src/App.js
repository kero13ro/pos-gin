import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import Inventory from "components/Inventory";
import Restock from "components/Restock";
import Checkout from "components/Checkout";
import Search from "components/Search";
import SignInScreen from "components/SignInScreen";
import Layout from "components/Layout";

import "antd/dist/antd.min.css";
import "style/common.scss";
import "style/utility.scss";
import "style/vendor.scss";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/restock" element={<Restock />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<SignInScreen />} />
            <Route path="*" element={<p className="ma-16">網址輸入錯誤</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
