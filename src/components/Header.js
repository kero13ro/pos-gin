import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  SearchOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { notification } from "antd";
import { axiosIns } from "../utilities/axios";

export default function Header() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  // useEffect(() => {
  //   axiosIns.get("all?sheetName=stock").then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  console.log(new Date().getTime());

  const getAll = () => {
    axiosIns.get("all?sheetName=stock").then((res) => {});
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="/checkout" icon={<ShoppingCartOutlined />}>
        <Link to="/checkout">結帳</Link>
      </Menu.Item>
      <Menu.Item key="/" icon={<AppstoreOutlined />}>
        <Link to="/">入庫</Link>
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
