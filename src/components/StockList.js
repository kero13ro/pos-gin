import React, { useState } from "react";
import { Radio, Button } from "antd";
import { allItems } from "../constants/category";

export default function StockList({ addCart }) {
  const [tabMain, setTabMain] = useState(100);

  const tabSubMenu = () => {
    const target = allItems.find((item) => item.value === tabMain);

    return target.sub.map((item) => ({ ...item, label: target.label }));
  };

  return (
    <div id="StockList">
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
            className="flex"
            size="large"
            onClick={() => addCart(item)}
          >
            <span className="mr-auto">{item.subName}</span>
            <span>{item.price} 元</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
