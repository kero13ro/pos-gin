import React from "react";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import preval from "preval.macro";

import "./App.scss";
import "antd/dist/antd.min.css";

function App() {
  const dateTimeStamp = preval`module.exports = new Date().toLocaleString();`;

  return (
    <Provider store={store}>
      <div className="app">
        <div className="deployTimestamp">{dateTimeStamp}</div>
        <Header></Header>
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
