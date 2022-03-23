import React from "react";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { getStatusLabel, statusMap } from "utilities/func";

export default function StatusButton({ item, updateCart, index }) {
  const Label = styled.div``;

  const updateStatus = (key) => {
    updateCart((cart) => {
      cart[index].status = Number(key);
    });
  };

  const dropOption = Object.entries(statusMap).filter((arr) => arr[0] !== 1);
  console.log(Object.entries(statusMap));

  const FilterMenu = (
    <Menu onClick={(obj) => updateStatus(obj.key)}>
      {dropOption.map((arr) => (
        <Menu.Item key={arr[0]}>{arr[1]}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={FilterMenu}>
      <Button
        size="small"
        type="primary"
        className={"mr-8 status-" + item.status}
      >
        <Label>{getStatusLabel(item.status)}</Label>
      </Button>
    </Dropdown>
  );
}
