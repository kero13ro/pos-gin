import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import { Radio, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { allItems } from "./data/category";
import { axiosIns } from "./utilities/axios";
import "./App.scss";

const { v4: uuidv4 } = require("uuid");

const App = () => {
  const [tabMain, setTabMain] = useState(100);
  const [cart, setCart] = useState([]);
  const cartPanel = useRef(null);

  const tabSubMenu = () => {
    const target = allItems.find((item) => item.value === tabMain);

    return target.sub.map((item) => ({ ...item, label: target.label }));
  };

  const addCart = (item) => {
    setCart([...cart, item]);

    setTimeout(() => {
      cartPanel.current.scrollTo({
        left: 0,
        top: cartPanel.current.scrollHeight,
        behavior: "smooth",
      });
    }, 1);
  };

  const removeCart = (index) => {
    const arr = cart.filter((_, index2) => index !== index2);
    setCart(arr);
  };

  const submitCart = () => {
    // const params = {
    //   tradeId: uuidv4(),
    //   date: new Date().toLocaleString(),
    //   cart,
    // };

    // console.log({ params });
    axiosIns.post("add", cart).then((res) => {
      console.log(res.data);
    });
  };

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
            <span>{item.price} 元</span>
          </Button>
        ))}
      </div>

      <div className="cartPanel" ref={cartPanel}>
        {cart.map((item, index) => (
          <div className="cartList" key={index}>
            <div className="mr-auto">{item.label}</div>
            {item.price}元<div className="slash"> / </div>
            {item.subName}
            <Button
              onClick={() => removeCart(index)}
              type="link"
              danger
              icon={<CloseOutlined />}
              size="small"
            />
          </div>
        ))}
      </div>
      <div className="footer">
        <span>總金額</span>
        <span>
          {cart
            .map((item) => item.price)
            .reduce((prev, curt) => prev + curt, 0)}
        </span>
        <span>元</span>
        <Button type="primary" onClick={submitCart}>
          確認結帳
        </Button>
      </div>
    </div>
  );
};

export default App;
