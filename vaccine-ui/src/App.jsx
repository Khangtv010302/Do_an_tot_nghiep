import React, { useEffect, useState,useLayoutEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import '../src/App.css';
import {
  HomeOutlined,
  UserOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Grid,notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie'
import { 
  faWarehouse,
  faChildren,
  faCalendar,
  faSyringe,
  faIndustry,
  faUsers,
  faTruckMedical
} from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  getItem('Tổng quan', 'DashBoard', <HomeOutlined />),
  getItem('Đối tượng', 'Object', <FontAwesomeIcon icon={faChildren} />),
  getItem('Kế hoạch', 'Plan', <FontAwesomeIcon icon={faCalendar} />),
  getItem('Nhập xuất', 'Storage', <FontAwesomeIcon icon={faWarehouse} />),
  getItem('Lịch tiêm chủng', 'Schedule', <UnorderedListOutlined />),
  getItem('Thống kê báo cáo', 'Statistical', <LineChartOutlined />),
  getItem('Nhà cung cấp', 'Manufacturer', <FontAwesomeIcon icon={faIndustry} />),
  getItem('Đơn vị xuất', 'UnitDelivering', <FontAwesomeIcon icon={faTruckMedical} />),
  getItem('Vaccine', 'Vaccine', <FontAwesomeIcon icon={faSyringe} />),
  getItem('Nhân viên', 'staff', <UserOutlined />),
  getItem('Loại nhân viên', 'type', <FontAwesomeIcon icon={faUsers} />),
];

// eslint-disable-next-line react/prop-types
const App = ({children,onChose}) => {
  //alert
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };

  //declare variable
  const [collapsed, setCollapsed] = useState(false);
  const [isLogin,setIsLogin]=useState(true);

  const navigate = useNavigate()
 
  useLayoutEffect(() => {
    if(sessionStorage.length <= 0  && Object.keys(Cookies.get()).length <= 0)
          setIsLogin(false)
    else setIsLogin(true);
  }, []);
  useEffect(() => {
    const interval  = setInterval(() => {
      if (compareDates ()){
        console.log("true");
      getNewToKen.mutate()
        }
      
      
    }, 1000); 
    return () => clearInterval(interval);
  }, []);
  const {
    token: { colorBgContainer,borderRadiusLG },
  } = theme.useToken();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
   //tanStackQuerry
   const getNewToKen = useMutation({
     mutationFn: () => {
       return axios({
         method: "get",
         url: "http://localhost:8080/API/Account/GetJwtTokenFromRefreshToken",
         headers: {
           "Content-type": "application/json",
           Authorization: `Bearer ${getJwtToken()}`,
         },
         params: getJwtRefreshUsername(),
       }).then((response) => {
        if (sessionStorage.length >= 3 ){
          sessionStorage.setItem("jwtToken",response.data.data.jwtToken)
      sessionStorage.setItem("expiredDate",response.data.data.expiredDate)
      }
      if ( Object.keys(Cookies.get()).length  >= 3){
        Cookies.set("jwtToken",response.data.data.jwtToken)
        Cookies.set("expiredDate",response.data.data.expiredDate)
      }
       });
     },
     onSuccess: () => {
     },
     onError: (error) => {
       openNotification("Thất bại", error.response.data.message);
       sessionStorage.clear();
       const cookieKeys = Object.keys(Cookies.get());
       // Iterate over each key and remove the corresponding cookie
       cookieKeys.forEach((key) => {
         Cookies.remove(key);
       });
       navigate("/Login", { replace: true });
     },
   });
  //function 
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") !== null)
      return sessionStorage.getItem("jwtToken");
    if (Cookies.get("jwtToken") !== undefined) return Cookies.get("jwtToken");
  };
  const getRoleCode = () => {
    if (sessionStorage.getItem("roleCode") !== null)
      return sessionStorage.getItem("roleCode");
    if (Cookies.get("roleCode") !== undefined) return Cookies.get("roleCode");
  };
  const onClick = (e) => {
    if (getRoleCode() !=="Admin" && (e.key === "type" || e.key === "staff" || e.key ==="Manufacturer" || e.key ==="Vaccine" || e.key ==="UnitDelivering"))
        openNotification("Thất bại", "Bạn không có quyền truy cập vào mục: "+e.key)
    else navigate("/"+e.key, { state: { key: "value" } });
   };
   
  const compareDates = () => {
    const currentTime = new Date();
    const dateObject = new Date(getExpiredDate());
    const expiredDateMinus= new Date(dateObject.getTime() - (30*100))
    return  currentTime > expiredDateMinus
    
  };
  const getExpiredDate = ()=>{
      if(sessionStorage.getItem("expiredDate") != null)
        return sessionStorage.getItem("expiredDate");
      if (Cookies.get("expiredDate") != undefined)
        return Cookies.get("expiredDate");
  }
  const getJwtRefreshUsername = ()=>{
    if (sessionStorage.length >= 3 )
      return {
        refreshToken: sessionStorage.getItem("refreshToken"),
        username: sessionStorage.getItem("username"), 
        jwtToken: sessionStorage.getItem("jwtToken")
    }
    if ( Object.keys(Cookies.get()).length  >= 3)
      return {
        refreshToken: Cookies.get("refreshToken"),
        username: Cookies.get("username"), 
        jwtToken: Cookies.get("jwtToken")
    }
  }
  return (
    isLogin === true ? <Layout
    style={{
      minHeight: '100vh',
    }}
 
  > 
         {contextHolder}
    <Sider collapsible collapsed={screens.xs ?  true : collapsed} onCollapse={(value) => setCollapsed(value)}>
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
  </Layout>: <Navigate to="/Login" replace></Navigate>
    
  );
};
export default App;