import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Radio } from "antd";
import { allItems } from "./data/category";
import { axiosIns } from "./utilities/axios";

import "./App.css";

const App = () => {
  const [value4, setValue4] = useState("微糖豆漿");

  const onChange4 = (e) => {
    setValue4(e.target.value);

    axiosIns.get(`all`).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    axiosIns.get("/").then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Header></Header>

      <Radio.Group
        size="large"
        className="RadioGroup"
        options={allItems}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  );
};

export default App;
