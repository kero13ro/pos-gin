import React, { useState } from "react";
import { Menu } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/checkout" icon={<ShoppingCartOutlined />}>
        <Link to="/checkout">結帳</Link>
      </Menu.Item>
      <Menu.Item key="/" icon={<AppstoreOutlined />}>
        <Link to="/">入庫</Link>
      </Menu.Item>
      <Menu.Item key="search" icon={<SearchOutlined />}>
        <Link to="/search">查詢</Link>
      </Menu.Item>
      <Menu.Item key="app3" icon={<SettingOutlined />} disabled>
        設定
      </Menu.Item>
    </Menu>
  );
}
