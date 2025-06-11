import {
  AppleOutlined,
  ContactsOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  MoneyCollectOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import { ConfigProvider, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    label,
    children,
  };
}
export default function DashBoard() {
  const navigate = useNavigate();
  const { Header, Content, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // if (user?.role == "MEMBER") {
  //   navigate("/");
  // }
  const [items, setItems] = useState([]);
  const [key, setKey] = useState();
  const location = useLocation();
  const currentURI =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const role = localStorage.getItem("role");
  if (!role) {
    navigate("/");
  }

  const dataOpen = JSON.parse(localStorage.getItem("keys")) ?? [];

  const [openKeys, setOpenKeys] = useState(dataOpen);

  useEffect(() => {
    //   let role = null;
    //   if (userInfo != null) {
    //     const dataUserInfo = JSON.parse(userInfo);
    //     role = dataUserInfo.role;

    //     SUser.set(dataUserInfo);

    //     console.log(JSON.parse(userInfo));
    //   }

    if (role == "owner") {
      setItems([
        getItem("Manage Employee", "manageEmployee"),
        getItem("Manage Task", "manageTask"),
        //   getItem('Chiến dịch', 'category'),
        //   getItem('Hỗ trợ', 'order'),
        getItem("Message", "message"),
      ]);
    }
    if (role == "employee") {
      setItems([
        getItem("Manage Task", "manageTaskEmployee"),
        //   getItem('Chiến dịch', 'category'),
        //   getItem('Hỗ trợ', 'order'),
        getItem("Message", "message"),
        getItem("Edit Profile", "profile"),
      ]);
    }
    // if (role == 'Sales Staff') {
    //   setItems([
    //     getItem('Management', 'management', <ContactsOutlined />, [
    //       getItem('Campaign', 'campaign', <AreaChartOutlined />),
    //       getItem('Post', 'post', <AuditOutlined />),
    //       getItem('Job Application', 'jobapplication', <BorderOutlined />)
    //     ]),
    //     getItem('Settings', 'settings', <SettingOutlined />, [
    //       getItem('Profile', 'profile', <UserOutlined />)
    //     ])
    //   ]);
    // }
    // setItems([
    //   getItem("Account", "account", <ContactsOutlined />),
    //   getItem("Profile", "profile", <SolutionOutlined />),
    //   getItem("Campaign", "campaign", <AreaChartOutlined />),
    //   // getItem("Statistical", "statistical", <ContainerOutlined />, [
    //   //   getItem("Overview Statistics", "overviewStatistics"),
    //   //   getItem("Session Statistics", "sessionStatistics"),
    //   // ]),
    // ]);
  }, []);

  const handleSubMenuOpen = (keyMenuItem) => {
    setOpenKeys(keyMenuItem);
  };
  const handleSelectKey = (keyPath) => {
    setKey(keyPath);
  };

  useEffect(() => {
    localStorage.setItem("keys", JSON.stringify(openKeys));
  }, [openKeys]);

  useEffect(() => {
    handleSubMenuOpen([...openKeys, key]);
  }, [currentURI]);
  // const handleClick = () => {
  //   navigate("/");
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };
  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        style={{ backgroundColor: "white" }}
        collapsed={false}
        width={250}
        className="pt-5"
        // style={{ backgroundColor: "yellow" }}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemHoverBg: "#D46B086D", // Màu nền khi hover
                itemHoverColor: "#623810FF", // Màu chữ khi hover
                itemPaddingInline: "32px",
                // itemActiveBg: "#none",
                // itemBg: "#none",
                itemSelectedBg: "#D46B086D",
                itemSelectedColor: "#none",
              },
            },
          }}
        >
          <Menu
            className="py-20"
            defaultSelectedKeys={["profile"]}
            mode="inline"
            selectedKeys={currentURI}
            inlineIndent={32}
            openKeys={openKeys}
            onOpenChange={handleSubMenuOpen}
            // items={items}
          >
            {items.map((item) =>
              item.children ? (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.children.map((subItem) => (
                    <Menu.Item
                      key={subItem.key}
                      // icon={subItem.icon}
                      title={subItem.label}
                      onClick={(e) => handleSelectKey(e.keyPath[1])}
                    >
                      <Link to={`/dashboard/${subItem.key}`} className="block ">
                        {subItem.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item
                  className="mb-6 block pb-6 pt-6"
                  key={item.key}
                  icon={item.icon}
                >
                  {/* <p class="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
     Thống kê
   </p> */}
                  <Link
                    className={` menu-item block text-center text-base ${
                      currentURI == item.key ? "isSelected" : ""
                    } `}
                    to={`/dashboard/${item.key}`}
                  >
                    {item.label}
                  </Link>
                </Menu.Item>
              )
            )}
          </Menu>
        </ConfigProvider>
      </Sider>
      <Layout>
        <Header
          style={{ background: colorBgContainer, boxSizing: "border-box" }}
          className="mt-2"
        >
          <div
            style={{
              textAlign: "center",

              position: "relative",
            }}
            className="flex items-center justify-between px-4"
          >
            <div
              style={{
                // position: 'absolute',
                // left: '20px',
                textAlign: "left",
                color: "black",
                border: "none",
                // borderRadius: '5px',
                // padding: '10px 12px',
                fontSize: "15px",
                lineHeight: "23px",
              }}
            >
              <span>
                Hi👋:
                {/* {user?.name} */}
              </span>
              <p>
                Role:
                {/* {getRole(user?.role)} */}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <img
                src={"/logo.png"}
                alt=""
                style={{ width: "40px" }}
                // onClick={handleClick}
              />
              {/* <p style={{ maxWidth: '200px', marginBottom: '16px' }}>
                   COMESTICS
                 </p> */}
            </div>
            <div>
              <LogoutOutlined
                type="primary"
                onClick={() => {
                  localStorage.removeItem("role");
                  // helper.cookie_delete('AT');
                  // dispatch(logout());
                  navigate("/");
                }}
                style={{
                  // position: 'absolute',
                  // right: '30px',
                  // top: '15px',
                  backgroundColor: "#1677ff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  fontSize: "16px",
                  cursor: "pointer",
                  height: "35px",
                  lineHeight: "23px",
                }}
              />
            </div>
          </div>
        </Header>
        <Content
          style={{ margin: "0 16px", display: "flex", flexDirection: "column" }}
        >
          {/* <Breadcrumb>
                 {location.pathname.split("/").map((path, index, paths) => {
                   const url = paths.slice(0, index + 1).join("/");
                   console.log(url);
                   return (
                     <Breadcrumb.Item key={path}>
                       <span to={`/${url}`}>{path}</span>
                     </Breadcrumb.Item>
                   );
                 })}
               </Breadcrumb> */}
          <div
            style={{
              marginTop: 24,
              padding: "24px 48px",
              marginBottom: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Outlet style={{ flex: 1, display: "flex" }} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
