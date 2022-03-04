import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Radio, Button } from "antd";
import { allItems } from "./data/category";
import { axiosIns } from "./utilities/axios";

import "./App.css";

const App = () => {
  const [value4, setValue4] = useState(100);

  const onChange4 = (e) => {
    setValue4(e.target.value);

    // axiosIns.get(`all`).then((res) => {
    //   console.log(res.data);
    // });
  };

  // useEffect(() => {
  //   axiosIns.get("/").then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  return (
    <div className="root">
      <div className="header">
        <Header></Header>
      </div>

      <Radio.Group
        size="large"
        className="RadioGroup"
        options={allItems}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      />

      <div className="subTab">
        {allItems
          .find((item) => item.value === value4)
          .sub.map((item) => (
            <Button key={item.id} className="btn">
              <span className="mr-auto">{item.subName}</span>
              <span>{item.price}</span>
            </Button>
          ))}
      </div>

      <div className="sumPanel">Sum</div>
      <div className="footer">
        <Button ghost>結帳</Button>
        <Button ghost>進貨</Button>
        <Button ghost>歷史紀錄</Button>
      </div>
    </div>
  );
};

export default App;
