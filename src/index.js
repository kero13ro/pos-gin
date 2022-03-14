import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restock from "./components/Restock";
import Checkout from "./components/Checkout";

import App from "./App";

ReactDOM.render(
  <BrowserRouter basename="/pos-gin">
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Restock />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<p className="ma-16">網址輸入錯誤</p>} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
