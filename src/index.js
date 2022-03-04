import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";

import App from "./App";

console.log(process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
