import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../src/App.css';
import {
  HomeOutlined,
  UserOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Grid } from 'antd';
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
import HeaderPage from './header/header';
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
  getItem('Kế hoạch', 'Plan', <FontAwesomeIcon icon={faCalendar} />),
  getItem('Nhập xuất', '4', <FontAwesomeIcon icon={faWarehouse} />),
  getItem('Nhà cung cấp', 'Manufacturer', <FontAwesomeIcon icon={faIndustry} />),
  getItem('Lịch tiêm chủng', 'Schedule', <UnorderedListOutlined />),
  getItem('Thống kê báo cáo', '10', <LineChartOutlined />),
  getItem('Vaccine', 'Vaccine', <FontAwesomeIcon icon={faSyringe} />),
  getItem('Nhân viên', 'staff', <UserOutlined />),
  getItem('Loại nhân viên', 'type', <FontAwesomeIcon icon={faUsers} />),
];

// eslint-disable-next-line react/prop-types
const App = ({children,onChose}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected,setSelected] = useState();
  const navigate = useNavigate()



  const onClick = (e) => {
    setSelected(e.key);
   onNavigate(e);
  };
  const onNavigate = (e) => {
    navigate("/"+e.key, { state: { key: "value" } });
  }
  const {
    token: { colorBgContainer,borderRadiusLG },
  } = theme.useToken();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    > 
       
      <Sider collapsible collapsed={screens.lg ? collapsed : true} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" > 
          <img src='/public/assets/VaccineLogo.png' alt='' className='Logo' ></img>
        </div>
        <Menu theme="dark" selectedKeys={[onChose]} mode="inline" items={items} 
        onClick={onClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          // <HeaderPage/>
        >
          <HeaderPage/>
        </Header>
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