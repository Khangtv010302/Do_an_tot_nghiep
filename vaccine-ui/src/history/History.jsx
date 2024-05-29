import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import App from "../App";

import {
  Space,
  Table,
  Input,
  Button,
  Modal,
  Dropdown,
  Form,
  notification,
  Select,
  Row,
  Checkbox,
  Col,
  Grid,
  DatePicker,
} from "antd";
import {
  faGear,
  faEye,
  faPencil,
  faTrashCan,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import LoadingModal from "../loading/Loading";
import { render } from "react-dom";

function HistoryInjection() {
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
    
        return `${year}-${month}-${day}`;
      };
    //declare variable
    const [fontSizeHeader, setFontSizeHeader] = useState("13px");
    const [listVaccine, setListVaccine] = useState([]);
    const [state,setState]=useState(true);
    const [reaction,setReaction]=useState(false);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const [page, setPage] = React.useState(1);
    const [response, setResponse] = useState([]);
    const dateFormat = "YYYY-MM-DD";
    const customLocale = {
      emptyText: '"Không có lịch sử tiêm', // Change this to your custom message
    };
  
    const [showLoading, setShowLoading] = useState(false);
    const today = new Date();
    const [form] = Form.useForm();
  
    const [operation, setOperation] = useState("");
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    const [firstDay, setFirstDay] = useState(formatDate(firstDayOfMonth));
    const [lastDay, setLastDay] = useState(formatDate(lastDayOfMonth));
    const columns = [
        
        {
          title: <span style={{ fontSize: fontSizeHeader }}>#</span>,
          dataIndex: "",
          key: "index",
    
          width: "4%",
          render: (_, __, index) => (
            <span style={{ fontSize: "12px" }}>{(page - 1) * 10 + index + 1}</span>
          ),
        },
        {
            title: <span style={{ fontSize: fontSizeHeader }}>Đối tượng</span>,
            width: "15%",
            responsive: ["sm"],
            dataIndex: "objectName",
            key: "objectName",
          },
        {
          title: <span style={{ fontSize: fontSizeHeader }}>Vắc xin</span>,
          dataIndex: "name",
          width: "7%",
          key: "name",
          render: (_, record) => (
            <span style={{ textAlign: "left" }}>
              <div
                style={{
                  fontSize: screens.xs ? "10px" : "14px",
                }}
              >
                {record.vaccineName}
              </div>
            </span>
          ),
        },
        {
            title: <span style={{ fontSize: fontSizeHeader }}>Số lô</span>,
            width: "8%",
            responsive: ["sm"],
            dataIndex: "lotNumber",
            key: "lotNumber",
          },
        {
          title: <span style={{ fontSize: fontSizeHeader }}>Tháng tiêm</span>,
          dataIndex: "monthOld",
          width: "7%",
          responsive: ["xl"],
          key: "monthOld",
          render: (monthOld) => (
            <div style={{ textAlign: "center", fontSize: "12px" }}>
              {monthOld === 0 ? "Sơ sinh" : monthOld}{" "}
            </div>
          ),
        },
        {
          title: <span style={{ fontSize: fontSizeHeader }}>Mũi</span>,
          width: "5%",
          responsive: ["xl"],
          dataIndex: "quantity",
          key: "quantity",
        },
       
        {
          title: <span style={{ fontSize: fontSizeHeader }}>Trạng thái</span>,
          dataIndex: "state",
          key: "state",
          responsive: ["xl"],
          render: (state) => (
            <div>
              {state ? (
                <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    backgroundColor: "#5cb85c	",
                    fontSize: "10px",
                    width: "100px",
                    borderRadius: "5px",
                    fontFamily: "Palatino Linotype Book Antiqua Palatino",
                  }}
                >
                  {" "}
                  Đã tiêm chủng{" "}
                </div>
              ) : (
                <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontFamily: "Roboto",
                    backgroundColor: "#d9534f	",
                    fontSize: "12px",
                    width: "100px",
                    borderRadius: "5px",
                  }}
                >
                  Chưa tiêm chủng{" "}
                </div>
              )}
            </div>
          ),
        },
    
        {
          title: <span style={{ fontSize: fontSizeHeader }}>Ngày tiêm</span>,
          dataIndex: "vaccinationDate",
          key: "vaccinationDate",
          render: (vaccinationDate) =>
            vaccinationDate === null ? (
              <div className="loading-container">
                <div className="loading"></div>
                <div className="loading-text">Chưa cập nhật</div>
              </div>
            ) : (
              format(new Date(vaccinationDate), "dd/MM/yyyy")
            ),
        },
        {
          title: <span style={{ fontSize: fontSizeHeader }}>Địa điểm</span>,
          dataIndex: "vaccinationLocation",
          key: "vaccinationLocation",
          render: (vaccinationLocation) =>
            vaccinationLocation === null ? (
              <div className="loading-container">
                <div className="loading"></div>
                <div className="loading-text">Chưa cập nhật</div>
              </div>
            ) : (
              vaccinationLocation
            ),
        },
        {
            title: <span style={{ fontSize: fontSizeHeader }}>Phản ứng sau tiêm</span>,
            responsive: ["sm"],
            dataIndex: "reaction",
            key: "reaction",
          
          },
        
    ];
    //useEffect
    useEffect(() => {
        if (screens.lg) setFontSizeHeader("13px");
        else setFontSizeHeader("10px");
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [screens]);
     //tanStackQuerry
  const { isLoading,error } = useQuery({
    queryKey: ["historyObjection"],
    queryFn: () =>
      axios({
        method: "get",
        url: "http://localhost:8080/API/General/History",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: { fromDate: firstDay, toDate: lastDay,
          reaction:reaction,state:state
         },
      }).then((response) => {
        console.log(response.data.data);
        setResponse(response.data.data);
        return response.data.data;
      }),
  });

  console.log(firstDay);
  console.log(lastDay);
     //function
     const handleSearch = () => {
        setShowLoading(true);
        searchHistoryInjected.mutate();
      };
      const searchHistoryInjected = useMutation({
        mutationFn: () => {
         
          return axios({
            method: "get",
            url: "http://localhost:8080/API/General/History",
            headers: {
               "Content-type": "application/json",
              Authorization: `Bearer ${getJwtToken()}`,
            },
            params: { fromDate: firstDay, toDate: lastDay,
              reaction:reaction,state:state
             },
          }).then((response) => {
            console.log(response.data.data);
            setResponse(response.data.data);
          });
        },
        onSuccess: () => {
          setShowLoading(false);
        },
        onError: (error) => {
          setShowLoading(false);
          console.log(error);
        },
      });
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") !== null)
      return sessionStorage.getItem("jwtToken");
    if (Cookies.get("jwtToken") !== undefined) return Cookies.get("jwtToken");
  };
    const disabledDateFirstDay = (currentDate) => {
        const minDate = dayjs(firstDay, "YYYY-MM-DD");
        return currentDate.isBefore(minDate, "day");
      };
    return (
        <App  onChose={"History"}>
           <Row style={{ border: "1px solid", borderColor: "#A9A9A9" }}>
        <Col span={24}>
          <Row>
            <Col span={10}>
              <div
                style={{
                  margin: "3%",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
               Lịch sử tiêm chủng
              </div>
            </Col>
           
          </Row>
        </Col>
        <Col
          span={24}
          style={{
            borderTop: "1px solid",
            borderColor: "#A9A9A9",
            padding: "1%",
          
          }}
        >
          <Row style={{}}>
            <Col xs={24} sm={24} md={11} lg={9} xl={6}>
              {" "}
              <Form.Item label="Ngày bắt đầu từ">
                <DatePicker
                  allowClear={false}
                  defaultValue={dayjs(firstDay, dateFormat)}
                  format={"DD/MM/YYYY"}
                  onChange={(e) => {
                    setFirstDay(e.format("YYYY-MM-DD"));
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9} lg={9} xl={5}>
              <Form.Item
                label="Đến ngày"
                allowClear={false}
                style={{
                  marginLeft:
                    screens.xl || screens.lg || screens.md ? "1%" : null,
                }}
              >
                <DatePicker
                  allowClear={false}
                  defaultValue={dayjs(lastDay, dateFormat)}
                  disabledDate={disabledDateFirstDay}
           
                  format={"DD/MM/YYYY"}
                  minDate={dayjs(firstDay, "DD/MM/YYYY")}
                  onChange={(e) => {
                    setLastDay(e.format("YYYY-MM-DD"));
                  }}
                />
              </Form.Item>
            </Col>
           
            <Col xs={24} sm={24} md={9} lg={9} xl={5}>
              <Form.Item
                label="Trạng thái"
              
                style={{
                  marginLeft:
                    screens.xl || screens.lg || screens.md ? "2%" : null,
                }}
               
              >
                <Select style={{}}
                 value={state}
                 onChange={(e)=>{
                  console.log(e)
                  setState(e);
                 }}>
              
                <Select.Option value={true}>Đã tiêm chủng</Select.Option>
                  <Select.Option value={false}>
                    Chưa tiêm chủng
                  </Select.Option>
                 
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={9} lg={9} xl={6}
              style={{
                marginLeft:
                  screens.xl || screens.lg || screens.md ? "2%" : null,
              }}>
              <Form.Item
                label="Phản ứng sau tiêm"
                // labelCol={4}
                // wrapperCol={15}
                allowClear={false}
                style={{
                  marginLeft:
                    screens.xl || screens.lg || screens.md ? "2%" : null,
                }}
            
              >
               <Select style={{}}
                   value={reaction}
                   onChange={(e)=>{
                    console.log(e)
                    setReaction(e);
                   }}>
               
                <Select.Option value={true}>Có phản ứng</Select.Option>
                  <Select.Option value={false}>
                    Không có phản ứng
                  </Select.Option>
                 
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ textAlign: "center" }}
            >
              <Button type="primary" onClick={handleSearch}>
                Tra cứu lịch sử tiêm
              </Button>
            </Col>
          </Row>
          
        </Col>
      </Row>
      <Row
        style={{ border: "1px solid", borderColor: "#A9A9A9", marginTop: "1%" }}
      >
        <Col
          span={24}
          style={{ margin: "1%", fontSize: "150%", fontWeight: "500" }}
        >
          Danh sách các mũi tiêm
        </Col>
        <Col
          span={24}
          style={{ borderTop: "1px solid", borderColor: "#A9A9A9" }}
        >
          {" "}
          <Table
            style={{ margin: "1%" }}
            scroll={{ x: 120, y: 400 }}
            locale={customLocale}
            loading={isLoading}
            showSorterTooltip={{ target: "sorter-icon" }}
            columns={columns}
            dataSource={response}
            rowKey="id"
            pagination={{
              defaultPageSize: 10,
              position: ["bottomCenter"],
              onChange(current) {
                setPage(current);
              },
            }}
          />
        </Col>
      </Row>
        </App>
      );
}

export default HistoryInjection;