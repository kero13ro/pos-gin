import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import "./App.scss";
import "antd/dist/antd.min.css";

function App() {
  return (
    <div className="app">
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default App;
