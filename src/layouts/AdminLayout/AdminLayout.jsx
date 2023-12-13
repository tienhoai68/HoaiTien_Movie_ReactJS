import React, { useState } from "react";
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import { Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.scss";
import { setUserInfoAction } from "../../store/actions/userAction";
import { useDispatch } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("User", "/admin/user/", <UserOutlined />),
  getItem("Films", "/admin/films", <PieChartOutlined />, [
    getItem("Film", "/admin/films", <PieChartOutlined />),
    getItem("Add new", "/admin/films/addnew", <PieChartOutlined />),
  ]),
  getItem("Showtime", "/admin/films/showtime/:filmId", <FileOutlined />),
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogOut = () => {
    localStorage.removeItem("USER_INFO");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onClick={({ key }) => {
            navigate(key);
          }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            margin: 10,
            fontSize: 30,
            padding: 10,
            background: colorBgContainer,
          }}
        >
          <div className="header-admin">
            <Button
              size="large"
              type="primary"
              className="btn-Logout"
              onClick={handleLogOut}
            >
              logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Copyright 2023 Movie Center | All Rights Reserved | Powered by
          CyberSoft
        </Footer>
      </Layout>
    </Layout>
  );
}
