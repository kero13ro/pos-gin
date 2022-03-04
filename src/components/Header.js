import React, { useState } from "react";
import { Menu } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { axiosIns } from "../utilities/axios";

export default function Header() {
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const getAll = () => {
    axiosIns.get("all").then((res) => {
      alert(res.data);
    });
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<ShoppingCartOutlined />}>
        結帳
      </Menu.Item>
      <Menu.Item key="app" icon={<AppstoreOutlined onClick={getAll} />}>
        入庫
      </Menu.Item>
      <Menu.Item key="app2" icon={<SearchOutlined />}>
        查詢
      </Menu.Item>
      <Menu.Item key="app3" icon={<SettingOutlined />}>
        設定
      </Menu.Item>
    </Menu>
  );
}
