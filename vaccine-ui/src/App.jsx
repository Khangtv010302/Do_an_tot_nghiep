import  { useEffect, useState,useLayoutEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import '../src/App.css';
import {
  HomeOutlined,
  UserOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {  Layout, Menu, theme,Grid,notification, Row, Col } from 'antd';
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
import {  useMutation } from "@tanstack/react-query";
import HeaderPage from './header/header';
import { Helmet } from 'react-helmet';
import { FacebookOutlined, History, HistoryOutlined } from '@mui/icons-material';
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
  getItem('Lịch sử tiêm chủng', 'History', <HistoryOutlined />),
  getItem('Kế hoạch', 'Plan', <FontAwesomeIcon icon={faCalendar} />),
  getItem('Nhập xuất', 'Storage', <FontAwesomeIcon icon={faWarehouse} />),
  getItem('Lịch tiêm chủng', 'Schedule', <UnorderedListOutlined />),
  getItem('Thống kê báo cáo', 'Statistical', <LineChartOutlined />),
  getItem('Nhà cung cấp', 'Manufacturer', <FontAwesomeIcon icon={faIndustry} />),
  getItem('Đơn vị xuất', 'UnitDelivering', <FontAwesomeIcon icon={faTruckMedical} />),
  getItem('Vắc xin', 'Vaccine', <FontAwesomeIcon icon={faSyringe} />),
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
      const currentTime = new Date();
      const dateObject = new Date(getExpiredDate());
      const expiredDateMinus = new Date(dateObject.getTime() - (60*1000))
      
     console.log(currentTime>expiredDateMinus);
      if (currentTime>expiredDateMinus){
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
      console.log("Lấy thành công")
     },
     onError: (error) => {
       openNotification("Thất bại", error.response.data.message);
       console.log("Lấy thất bại "+error)
       console.log(error)
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
  const currentLabel = items.find(item => item.key === onChose)?.label;
  return (
    isLogin === true ? <Layout
    style={{
      minHeight: '100vh',
    }}
 
  > 
              <Helmet>
                <meta charSet="utf-8" />
                <title>{currentLabel}</title>
              </Helmet>
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
      <Footer style={{ backgroundColor: 'rgb(0, 21, 41)', padding: '40px 50px', color:"white"}}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <h3 style={{color:"#C02424",fontSize:"20px  "}}>Trạm y tế phường Vĩnh Thọ</h3>
          <p>Trạm y tế phường Vĩnh Thọ thành phố Nha Trang tỉnh Khánh Hòa được xây dựng nhằm cung cấp dịch vụ khám chữa bệnh cho người dân phường Vĩnh Thọ, tổ chức các hoạt động y tế như tiêm chủng; phỏng chống dịch bệnh và quản lý, theo dõi sức khỏe cho các đối tượng như người cao tuổi, trẻ sơ sinh và phụ nữa mang thai.</p>
        
        </Col>
        <Col xs={24} sm={8}>
        <h3 style={{color:"#C02424",fontSize:"20px  "}}>Thông tin</h3>
          <a className='info-a'  href='https://mapstore.vn/dia-diem/tinh-khanh-hoa/thanh-pho-nha-trang/phuong-vinh-tho/tram-y-te-phuong-vinh-tho-15-ho-tung-mau-phuong-vinh-tho-thanh-pho-nha-trang-tinh-khanh-hoa-1633050010112000'>Trạm y tế phường Vĩnh Thọ</a>
        </Col>
        <Col xs={24} sm={8}>
        <h3 style={{color:"#C02424",fontSize:"20px  "}}>Liên hệ</h3>
          <p>Phone: +058 3834 009</p>
          <p>Follow us: 
          </p>
          <p style={{marginTop:"1%",}}>
          <a className="footer-link" href="https://www.facebook.com/pages/Tr%E1%BA%A1m%20Y%20T%E1%BA%BF%20Ph%C6%B0%E1%BB%9Dng%20V%C4%A9nh%20Th%E1%BB%8D/539950223127629/" target="_blank" rel="noopener noreferrer" >
              <FacebookOutlined />
            </a>
          </p>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <span>© 2024 Trạm y tế phường Vĩnh Thọ</span>
      </div>
    </Footer>
    </Layout>
  </Layout>: <Navigate to="/Login" replace></Navigate>
    
  );
};
export default App;