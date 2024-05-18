import App from "../App";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./DashBoard.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useLayoutEffect, useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReceipt,
  faSyringe,
  faCalendarDay,
  faChild
} from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card,Statistic,Space } from "antd";
const DashBoard = () => {
  //declare

  const navigate = useNavigate()
  const [numberVaccine, setNumberVaccine] = useState(0);
  const [numberStorage, setNumberStorage] = useState(0);
  const [numberPlan, setNumberPlan] = useState(0);
  const [listVaccine, setListVaccine] = useState([]);
  const [ListNumberVaccineInjected, setListNumberVaccineInjected] = useState(
    []
  );
  const [numberObject, setNumberObject] = useState(0);
  //function
  
 
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") != null) {
      return sessionStorage.getItem("jwtToken");
    }
    if (Cookies.get("jwtToken") != undefined) {
      return Cookies.get("jwtToken");
    }
  };
  const getNumberVaccine = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/DashBoard/SelectNumberVaccine",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
    }).then((response) => {
      setNumberVaccine(response.data.data);
    });
  };
  const getListVaccine = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/General/Vaccine",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
    }).then((response) => {
      setListVaccine(response.data.data);
    });
  };
  const getNumberVaccineByVaccineId = (id, name) => {
    const vaccineId = id;
    axios({
      method: "get",
      url: "http://localhost:8080/API/DashBoard/SelectNumberVaccineByVaccineId",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      params: { vaccineId },
    }).then((response) => {
      setListNumberVaccineInjected((prevList) => [
        ...prevList,
        {
          number: response.data.data,
          name: name,
        },
      ]);
    });
  };
  const getNumberStorage = () => {
    axios({
      method: "get",
      url: "  http://localhost:8080/API/DashBoard/SelectNumberReceiveDeliver",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
    }).then((response) => {
      setNumberStorage(response.data.data);
    });
  };
  const getNumberPlan = () => {
    axios({
      method: "get",
      url: "  http://localhost:8080/API/DashBoard/SelectNumberReceiveDeliver",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
    }).then((response) => {
      setNumberPlan(response.data.data);
    });
  };
  const getNumberObject = () => {
    axios({
      method: "get",
      url: "  http://localhost:8080/API/DashBoard/SelectNumberObjectReminder",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
    }).then((response) => {
      setNumberObject(response.data.data);
    });
  };

  useLayoutEffect(() => {
    getNumberVaccine();
    getNumberStorage();
    getNumberPlan();
    getNumberObject();
    getListVaccine();
  }, []);
  useEffect(() => {
    listVaccine.map((vaccine) => {
      getNumberVaccineByVaccineId(vaccine.id, vaccine.name);
      return null;
    });
  }, [listVaccine]);
  return (
    <App onChose={"DashBoard"}>
      <div>
     
        <div
          style={{
          
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "1%",
          }}
        >
          Số liệu tổng quan
        </div>
       <Row style={{ border: "1px solid",textAlign:"center",borderColor:"#A9A9A9",backgroundColor:"#fafafa", borderRadius:"10px", marginTop:"1%" }}>
          <Col xs={10} sm={10} md={10} lg={4} xl={4} style={{width:"80%",margin:"1%"}}>
          <Card
          hoverable
          onClick={()=>{
            navigate("/Schedule")
          }}
            >
              <Space direction="horizontal">
              <FontAwesomeIcon icon={faSyringe} style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }} />
             <Statistic title={"Số loại vắc xin"} value=  {numberVaccine} ></Statistic>
           
             </Space>

            </Card>
          </Col>
          <Col xs={13} sm={13} md={13} lg={5} xl={6}  style={{width:"100%",margin:"1%"}}>
          <Card
           hoverable
           onClick={()=>{
             navigate("/Storage")
           }}
            >
              <Space direction="horizontal">
              <FontAwesomeIcon icon={faReceipt} style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }} />
             <Statistic title={"Số lượng phiếu nhập xuất"} value=   {numberStorage}></Statistic>
           
             </Space>

            </Card>
          </Col>
          <Col xs={11} sm={11} md={11} lg={5} xl={6}  style={{width:"100%",margin:"1%"}}>
          <Card
           hoverable
           onClick={()=>{
             navigate("/Plan")
           }}
            >
              <Space direction="horizontal">
              <FontAwesomeIcon icon={faCalendarDay} style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }} />
             <Statistic title={"Số kế hoạch đã hoàn thành"} value=   {numberPlan }></Statistic>
           
             </Space>

            </Card>
          </Col>
          <Col xs={11} sm={11} md={11} lg={6} xl={6}  style={{width:"100%",margin:"1%"}}>
          <Card
           hoverable
           onClick={()=>{
             navigate("/Object")
           }}
            >
              <Space direction="horizontal">
              <FontAwesomeIcon icon={faChild} style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }} />
             <Statistic title={"Số đối tượng đang đăng ký tiêm"} value={numberObject}></Statistic>
           
             </Space>

            </Card>
          </Col>
        </Row>
        <div
          style={{
            margin: "1% 0",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Thống kê số lượng vắc xin đã tiêm
        </div>
       
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "1% 0", }}>
        <BarChart width={600} height={300} data={ListNumberVaccineInjected}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="number" fill="#8884d8" name="Số lượng" />
          </BarChart>
        </div>
              
       
      </div>
    </App>
  );
};

export default DashBoard;
