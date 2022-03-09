import React, { useState } from "react";
import { Menu } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
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
        <Link to="/">結帳</Link>
      </Menu.Item>
      <Menu.Item key="app" icon={<AppstoreOutlined />}>
        <Link to="/restock">入庫</Link>
      </Menu.Item>
      <Menu.Item key="app2" icon={<SearchOutlined onClick={getAll} disabled />}>
        查詢
      </Menu.Item>
      <Menu.Item key="app3" icon={<SettingOutlined />} disabled>
        設定
      </Menu.Item>
    </Menu>
  );
}
