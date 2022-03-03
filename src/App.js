import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./comp/Header";
import { Radio } from "antd";
import { allItems } from "./data/category";

import "./App.css";

const App = () => {
  const [value4, setValue4] = useState("微糖豆漿");

  const onChange4 = (e) => {
    setValue4(e.target.value);
    axios.get(`https://sheet1218.herokuapp.com/all`).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    // axios.get(`https://sheet1218.herokuapp.com/all`).then((res) => {
    // axios.get(`http://localhost:9107/all`).then((res) => {
    //   console.log(res.data);
    // });
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
