import React, { useState } from "react";
import { Menu } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
// import { message } from "antd";
import { notification } from "antd";
import { axiosIns } from "../utilities/axios";

export default function Header() {
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const getAll = () => {
    axiosIns.get("all").then((res) => {
      // message.info(res.data);
      notification.open({
        message: "全部庫存",
        description: res.data,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    });
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<ShoppingCartOutlined />}>
        結帳
      </Menu.Item>
      <Menu.Item key="app" icon={<AppstoreOutlined />} disabled>
        入庫
      </Menu.Item>
      <Menu.Item key="app2" icon={<SearchOutlined onClick={getAll} />}>
        查詢
      </Menu.Item>
      <Menu.Item key="app3" icon={<SettingOutlined />} disabled>
        設定
      </Menu.Item>
    </Menu>
  );
}
