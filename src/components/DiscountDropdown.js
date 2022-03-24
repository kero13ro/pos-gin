import React from "react";
import { Button, Dropdown, Menu } from "antd";

const dropOption = [5, 10, 15, 20];

export default function DiscountDropdown({ item, updateCart, index }) {
  const updateStatus = (key) => {
    updateCart((cart) => {
      cart[index].discount = Number(key);
      cart[index].sold = cart[index].price - Number(key);
    });
  };

  const FilterMenu = (
    <Menu onClick={(obj) => updateStatus(obj.key)}>
      {dropOption.map((val) => (
        <Menu.Item key={val} className={val === item.status && "active"}>
          {val}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={FilterMenu}>
      <Button size="small" type="primary">
        {item.discount} 元
      </Button>
    </Dropdown>
  );
}
