import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import preval from "preval.macro";

import "./App.scss";
import "antd/dist/antd.min.css";

function App() {
  const dateTimeStamp = preval`module.exports = new Date().toLocaleString();`;

  return (
    <div className="app">
      <div className="timestamp">{dateTimeStamp}</div>
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default App;
