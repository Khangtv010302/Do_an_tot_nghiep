import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../src/App.css';
import {
  HomeOutlined,
  UserOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWarehouse,
  faChildren,
  faCalendar,
  faSyringe,
  faIndustry,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import Type from './type/type';
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
  getItem('Trang chủ', 'Home', <HomeOutlined />),
  getItem('Đối tượng', 'Object', <FontAwesomeIcon icon={faChildren} />),
  getItem('Kế hoạch', '3', <FontAwesomeIcon icon={faCalendar} />),
  getItem('Nhập xuất', '4', <FontAwesomeIcon icon={faWarehouse} />),
  getItem('Vaccine', 'Vaccine', <FontAwesomeIcon icon={faSyringe} />),
  getItem('Nhà cung cấp', 'Manufacturer', <FontAwesomeIcon icon={faIndustry} />),
  getItem('Danh sách các mũi tiêm', '8', <UnorderedListOutlined />),
  getItem('Nhân viên', 'staff', <UserOutlined />),
  getItem('Thống kê báo cáo', '10', <LineChartOutlined />),
  getItem('Loại nhân viên', 'type', <FontAwesomeIcon icon={faUsers} />),
];
// eslint-disable-next-line react/prop-types
const App = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onClick = (e) => {
    
    navigate("/"+e.key, { state: { key: "value" } });
    console.log(e.key);

  };
  const {
    token: { colorBgContainer,borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    > 
       
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" >
          <img src='/public/assets/VaccineLogo.png' alt='' className='Logo' ></img>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} 
        onClick={onClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        <Content
           style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;