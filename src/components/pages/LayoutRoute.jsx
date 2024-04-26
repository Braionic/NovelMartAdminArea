import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import { FaBell } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";

const LayoutRoute = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        {!collapsed ? (
          <div className="bg-warning p-2 d-flex align-items-center justify-content-center gap-2">
            <h3 className="text-dark fs-4">NovelMart</h3>
            <span className="bg-light py-1 px-2 rounded fw-bold">Admin</span>
          </div>
        ) : (
          <h3 className="text-warning text-center  p-2">NV</h3>
        )}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <FaDatabase />,
              label: "Catalog",
              children: [{ key: "product list",icon: <VideoCameraOutlined />, label: "Product List" },
              { key: "product",icon: <VideoCameraOutlined />, label: "Product" },
              { key: "categories list",icon: <VideoCameraOutlined />, label: "Categories List" },
              { key: "Categories",icon: <VideoCameraOutlined />, label: "Categories" }],
            },
            {
              key: "customers",
              icon: <UserOutlined />,
              label: "customers",
              children: [
                { key: "customers list",icon: <VideoCameraOutlined />, label: "Customers List" },
                { key: "Customer",icon: <VideoCameraOutlined />, label: "Customer" }
              ]
            },
            { key: "orders",icon: <VideoCameraOutlined />, label: "Orders", children: [
              { key: "orders list",icon: <VideoCameraOutlined />, label: "Orders List" },
              { key: "orders details",icon: <VideoCameraOutlined />, label: "Orders Details" },
            ] },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ maxHeight: "50px" }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="d-flex align-items-center justify-content-center gap-3 ">
              <FaBell size={25} />
              <div>
                <img
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/vendor/flag-icons/24/DE.png"
                  alt="country"
                  className="img-fluid"
                />
              </div>

              <div>
                <div className="d-flex align-items-center justify-content-center m-3 pt-2 gap-2">
                  <img
                    src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                    alt="profile"
                    className="rounded-3 img-fluid"
                    style={{ width: "35px", height: "35px" }}
                  />
                  <div
                    className="d-flex flex-column align-items-item justify-content-center gap-0"
                    style={{ height: "20px", lineHeight: "1.5" }}
                  >
                    <p
                      className="mb-0 mt-3 fw-bold "
                      style={{ fontSize: "12px" }}
                    >
                      Novel Tunes Chukwuemeke
                    </p>
                    <p
                      className="mt-0 text-bg-secondary "
                      style={{ fontSize: "12px" }}
                    >
                      Noveltunes@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#e9ecef",
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutRoute;
