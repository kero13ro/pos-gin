import React, { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
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
  // fix github baseurl
  // https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/restock" element={<Restock />} />
            <Route path="/" element={<Checkout />} />
            <Route path="/search" element={<Search />} />
            <Route path="/sign" element={<SignInScreen />} />
            <Route path="*" element={<p className="ma-16">網址輸入錯誤</p>} />
          </Route>
        </Routes>      
      </HashRouter>
    </Provider>
  );
}

export default App;
