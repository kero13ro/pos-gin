import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Radio, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { allItems } from "./data/category";
import { axiosIns } from "./utilities/axios";

import "./App.scss";

const App = () => {
  const [tabMain, setTabMain] = useState(100);
  const [cart, setCart] = useState([]);

  const addCart = (item) => {
    // console.log(item);
    setCart([...cart, item]);
  };

  const tabSubMenu = () => {
    const target = allItems.find((item) => item.value === tabMain);

    return target.sub.map((item) => ({ ...item, label: target.label }));
  };

  console.log(tabSubMenu());

  return (
    <div className="root">
      <div className="header">
        <Header></Header>
      </div>

      <Radio.Group
        className="mainTab"
        size="large"
        options={allItems}
        onChange={(e) => {
          setTabMain(e.target.value);
        }}
        value={tabMain}
        optionType="button"
        buttonStyle="solid"
      />

      <div className="subTab">
        {tabSubMenu().map((item) => (
          <Button
            key={item.id}
            className="btn"
            size="large"
            onClick={() => addCart(item)}
          >
            <span className="mr-auto">{item.subName}</span>
            <span>{item.price}</span>
          </Button>
        ))}
      </div>

      <div className="cartPanel">
        {cart.map((item) => (
          <div className="cartList" key={item.subName}>
            <div className="mr-auto">{item.label}</div>
            {item.subName}
            <Button type="link" danger icon={<CloseOutlined />} size="small" />
          </div>
        ))}
      </div>
      <div className="footer">
        {/* <Button ghost className="mr-8">
          全部刪除
        </Button> */}
        <Button type="primary">確認結帳</Button>
      </div>
    </div>
  );
};

export default App;
