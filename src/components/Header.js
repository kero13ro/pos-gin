import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Header() {
  const [current, setCurrent] = useState("mail");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<MailOutlined />}>
        結帳
      </Menu.Item>
      <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
        入庫
      </Menu.Item>
      <Menu.Item key="app2" disabled icon={<AppstoreOutlined />}>
        查詢
      </Menu.Item>
      <Menu.Item key="app3" disabled icon={<SettingOutlined />}>
        設定
      </Menu.Item>
    </Menu>
  );
}
