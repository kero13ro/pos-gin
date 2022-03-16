import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import preval from "preval.macro";
import useMutateStock from "./hook/useMutateStock";

import "./App.scss";
import "antd/dist/antd.min.css";

function App() {
  const dateTimeStamp = preval`module.exports = new Date().toLocaleString();`;
  const { FetchSheet } = useMutateStock();

  useEffect(() => {
    FetchSheet();
  }, []);

  return (
    <div className="app">
      <div className="deployTimestamp">{dateTimeStamp}</div>
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default App;
