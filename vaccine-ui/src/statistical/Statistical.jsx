import App from "../App";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReceipt,
  faSyringe,
  faCalendarDay,
  faChild
} from '@fortawesome/free-solid-svg-icons';
import {
    Space,
    Table,
    Input,
    Button,
    Modal,
    Statistic,
    Card,
    Dropdown,
    Form,
    notification,
    Radio,
    Select,
    Switch,
    Menu,
    Row,
    Checkbox,
    Col,
    Grid,
    Tooltip,
    Upload,
    DatePicker,
    message,
    ConfigProvider,
  } from "antd";
  import React, { useEffect, useState } from "react";
  
function Statistical() {
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
    
        return `${year}-${month}-${day}`;
      };
    
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
 

  const dateFormat = "YYYY-MM-DD";
  

  const [showLoading, setShowLoading] = useState(false);
  const today = new Date();
 
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [firstDay, setFirstDay] = useState(formatDate(firstDayOfMonth));
  const [lastDay, setLastDay] = useState(formatDate(lastDayOfMonth));

    //function
    const handleSearch = () => {
        console.log(firstDay);
        console.log(lastDay);
        setShowLoading(true);
        
      };
    const disabledDateFirstDay = (currentDate) => {
        const minDate = dayjs(firstDay, 'YYYY-MM-DD');
        return currentDate.isBefore(minDate, 'day');
    };
    return (
      <App onChose={"Statistical"}>
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "1%",
          }}
        >
          Thống kê
        </div>
        <Row style={{ border: "1px solid",borderColor:"#A9A9A9",backgroundColor:"#fafafa", paddingTop:"20px",paddingLeft:"20px",borderRadius:"10px" }}>
          <Col xs={24} sm={24} md={11} lg={9} xl={9}>
            {" "}
            <Form.Item label="Ngày bắt đầu từ">
              <DatePicker
                allowClear={false}
                defaultValue={dayjs(firstDay, dateFormat)}
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                onChange={(e) => {
                  setFirstDay(e.format("YYYY-MM-DD"));
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={9} lg={9} xl={9}>
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
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
                minDate={dayjs(firstDay, "DD/MM/YYYY")}
                onChange={(e) => {
                  setLastDay(e.format("YYYY-MM-DD"));
                }}
              />
            </Form.Item>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={5}
            lg={5}
            xl={5}
            style={{ textAlign: "center" }}
          >
            <Button type="primary" onClick={handleSearch}>
              Thống kê
            </Button>
          </Col>
        </Row>
        <Row style={{ border: "1px solid",textAlign:"center",borderColor:"#A9A9A9",backgroundColor:"#fafafa", borderRadius:"10px", marginTop:"1%" }}>
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={5}
            xl={5}
            style={{ width: "80%", margin: "1%" }}
          >
            <Card>
              <Space direction="horizontal">
                <FontAwesomeIcon
                  icon={faChild}
                  style={{
                    color: "green",
                    backgroundColor: "rgba(0,255,0,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
                <Statistic title={"Số người tiêm"} value="test"></Statistic>
              </Space>
            </Card>
          </Col>
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={5}
            xl={5}
            style={{ width: "80%", margin: "1%" }}
          >
            <Card>
              <Space direction="horizontal">
                <FontAwesomeIcon
                  icon={faChild}
                  style={{
                    color: "green",
                    backgroundColor: "rgba(0,255,0,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
                <Statistic title={"Số vắc xin tồn cũ"} value="test"></Statistic>
              </Space>
            </Card>
          </Col>
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={5}
            xl={5}
            style={{ width: "80%", margin: "1%" }}
          >
            <Card>
              <Space direction="horizontal">
                <FontAwesomeIcon
                  icon={faChild}
                  style={{
                    color: "green",
                    backgroundColor: "rgba(0,255,0,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
                <Statistic title={"Số vắc xin mới nhập"} value="test"></Statistic>
              </Space>
            </Card>
          </Col>
          <Col
            xs={10}
            sm={10}
            md={10}
            lg={5}
            xl={5}
            style={{ width: "80%", margin: "1%" }}
          >
            <Card>
              <Space direction="horizontal">
                <FontAwesomeIcon
                  icon={faChild}
                  style={{
                    color: "green",
                    backgroundColor: "rgba(0,255,0,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
                <Statistic title={"Số vắc xin sử dụng"} value="test"></Statistic>
              </Space>
            </Card>
          </Col>
        </Row>
      </App>
    );
}

export default Statistical;