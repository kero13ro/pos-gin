import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { statusLabelMap } from "utilities/constants";

export default function StatusButton({ item, updateCart, index }) {
  const updateStatus = (key) => {
    updateCart((cart) => {
      cart[index].status = key;
    });
  };

  let dropOption = Object.entries(statusLabelMap).filter(
    (arr) => arr[0] !== "a1"
  );

  dropOption.splice(3, 0, "Divider");

  const FilterMenu = (
    <Menu onClick={(obj) => updateStatus(obj.key)}>
      {dropOption.map((arr) => {
        if (arr === "Divider") return <Menu.Divider key={arr} />;

        return (
          <Menu.Item
            key={arr[0]}
            className={arr[0] === item.status && "active"}
          >
            {arr[1]}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={FilterMenu}>
      <Button
        size="small"
        type="primary"
        className={"mr-8 removeTrans status-" + item.status}
      >
        {statusLabelMap[item.status]}
      </Button>
    </Dropdown>
  );
}
