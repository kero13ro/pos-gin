import React, { useState } from "react";
import Header from "./comp/Header";
import { Tabs, Radio, Space } from "antd";
// import { Button } from "antd";

import { allItems } from "./data/category";

import "./App.css";

const { TabPane } = Tabs;

const App = () => {
  // console.log(allItems);
  const [value4, setValue4] = useState("微糖豆漿");
  const onChange4 = (e) => {
    console.log("radio4 checked", e.target.value);
    setValue4(e.target.value);
  };
  return (
    <div className="App">
      <Header></Header>

      {/* <Radio.Group defaultValue="a" className="aa" size="large" type="primary">
        {allItems.map((item) => (
          <Radio.Button key={item.name} value={item.name}>
            {item.name}
          </Radio.Button>
        ))}
      </Radio.Group> */}

      <Radio.Group
        size="large"
        className="aa"
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
