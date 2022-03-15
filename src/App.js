import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import moment from "moment";

import "./App.scss";
import "antd/dist/antd.min.css";

function App() {
  return (
    <div className="app">
      <div className="timestamp">{moment().format("M/D HH:mm")}</div>
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default App;
