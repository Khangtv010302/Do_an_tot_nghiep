import App from "../App";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveAs } from 'file-saver';
import "./Statistical.css";
import {
  faSyringe,
  faChild,
  faStarOfLife,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Space,
  Table,
  Button,
  Statistic,
  Card,
  Form,
  Row,
  Col,
  Grid,
  DatePicker,
  notification,
} from "antd";
import  { useEffect, useState } from "react";
import LoadingModal from "../loading/Loading";

function Statistical() {
  //notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  //declare
  const [listNumberVaccineStatistical, setListNumberVaccineStatistical] =
    useState([]);
  const [numberVaccineInjected, setNumberVaccineInjected] = useState(0);
  const [numberObjectReaction, setNumberObjectReaction] = useState(0);
  const [numberObject, setNumberObject] = useState(0);
  const [numberOldVaccine, setNumberOldVaccine] = useState(0);
  const [numberNewVaccine, setNumberNewVaccine] = useState(0);
  const [showLoading, setShowLoading] = useState(false);
  const { useBreakpoint } = Grid;

  const screens = useBreakpoint();
  const dateFormat = "YYYY-MM-DD";

  const [listVaccine, setListVaccine] = useState([]);
  const today = new Date();

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [firstDay, setFirstDay] = useState(formatDate(firstDayOfMonth));
  const [lastDay, setLastDay] = useState(formatDate(lastDayOfMonth));
  const columns = [
    {
      title: "Vắc xin",
      dataIndex: "name",
      key: "name",
      className: "custom-object-number",
    },
    {
      title: "Số đối tượng được tiêm",
      dataIndex: "objectNumber",
      key: "objectNumber",
      width: "15%",
    },
    {
      title: "SL tồn cũ",
      dataIndex: "oldNumber",
      key: "oldNumber",
      width: "15%",
    },
    {
      title: "SL tồn mới nhận",
      dataIndex: "newNumber",
      key: "newNumber",
      width: "15%",
    },
    {
      title: "SL sử dụng",
      dataIndex: "useNumber",
      key: "useNumber",
      width: "15%",
    },
    {
      title: "Số đối tượng có phản ứng",
      dataIndex: "reactionNumber",
      key: "reactionNumber",
      width: "15%",
    },
  ];

  //function
  const handleExport = () => {
    console.log(listNumberVaccineStatistical);
    setShowLoading(true);
    createExcel.mutate(listNumberVaccineStatistical);
  };
  const createExcel = useMutation({
    mutationFn: (values) => {
      values.push({
        objectNumber: numberObject,
        oldNumber: numberOldVaccine,
        newNumber: numberNewVaccine,
        useNumber: numberVaccineInjected,
        reactionNumber: numberObjectReaction,
        name: "Tổng",
      });
      console.log(values);
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Statistical/CreateExcel",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        responseType: 'arraybuffer',
        data: values,
      }).then((response) => {
        console.log(response.data);
        const blob = new Blob([response.data], { type: 'application/octet-stream' }); // Tạo Blob từ dữ liệu
        saveAs(blob, 'Báo cáo.xlsx');
      
      });
    },
    onSuccess: () => {
      setShowLoading(false);
      openNotification("Thành công", "Đã xuất tập tin excel thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
      console.log(error.response);
    },
  });
  const getNumberVaccineByVaccineId = (id, name) => {
    const vaccineId = id;
    axios({
      method: "get",
      url: "http://localhost:8080/API/Statistical/GetAllNumberByVaccineId",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      params: { vaccineId, fromDate: firstDay, toDate: lastDay },
    }).then((response) => {
      if(response.data.data.objectNumber != 0 || response.data.data.oldNumber != 0 || response.data.data.newNumber != 0)
      setListNumberVaccineStatistical((prevList) => [
        ...prevList,
        {
          objectNumber: response.data.data.objectNumber,
          oldNumber: response.data.data.oldNumber,
          newNumber: response.data.data.newNumber,
          useNumber: response.data.data.useNumber,
          reactionNumber: response.data.data.reactionNumber,
          name: name,
        },
      ]);
    });
  };
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") != null) {
      return sessionStorage.getItem("jwtToken");
    }
    if (Cookies.get("jwtToken") != undefined) {
      return Cookies.get("jwtToken");
    }
  };
  const getNumberObjectInjected = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/Statistical/NumberObject",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      params: {
        fromDate: firstDay,
        toDate: lastDay,
      },
    }).then((response) => {
      setNumberObject(response.data.data);
    });
  };
  const getNumberVaccineInjected = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/Statistical/NumberVaccineInjected",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      params: {
        fromDate: firstDay,
        toDate: lastDay,
      },
    }).then((response) => {
      setNumberVaccineInjected(response.data.data);
    });
  };
  const getNumberObjectReaction = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/Statistical/NumberObjectReaction",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      params: {
        fromDate: firstDay,
        toDate: lastDay,
      },
    }).then((response) => {
      setNumberObjectReaction(response.data.data);
    });
  };
  const getNumberNewVaccine = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/Statistical/NumberNewVaccine",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      params: {
        fromDate: firstDay,
        toDate: lastDay,
      },
    }).then((response) => {
      setNumberNewVaccine(response.data.data);
    });
  };
  const getNumberOldVaccine = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/Statistical/NumberOldVaccine",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      params: {
        fromDate: firstDay,
        toDate: lastDay,
      },
    }).then((response) => {
      setNumberOldVaccine(response.data.data);
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
  const handleStatistical = () => {
    setListNumberVaccineStatistical([]);
    setShowLoading(true);
    console.log(firstDay);
    console.log(lastDay);
    getNumberObjectInjected();
    getNumberOldVaccine();
    getNumberNewVaccine();
    getNumberVaccineInjected();
    getNumberObjectReaction();
    listVaccine.map((vaccine) => {
      getNumberVaccineByVaccineId(vaccine.id, vaccine.name);
      return null;
    });
    setShowLoading(false);
  };
  const disabledDateFirstDay = (currentDate) => {
    const minDate = dayjs(firstDay, "YYYY-MM-DD");
    return currentDate.isBefore(minDate, "day");
  };
  //useEffect
  useEffect(() => {
    getListVaccine();
    getNumberObjectInjected();
    getNumberOldVaccine();
    getNumberNewVaccine();
    getNumberVaccineInjected();
    getNumberObjectReaction();
  }, []);
  useEffect(() => {
    listVaccine.map((vaccine) => {
      getNumberVaccineByVaccineId(vaccine.id, vaccine.name);
      return null;
    });
  }, [listVaccine]);
  return (
    <App onChose={"Statistical"}>
      {contextHolder}
      <Row>
        <Col span={12}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "1%",
            }}
          >
            Thống kê
          </div>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button
            className="export-button"
            icon={<FontAwesomeIcon icon={faFileExport} />}
            onClick={handleExport}
          >
            Xuất file
          </Button>
        </Col>
      </Row>

      <Row
        style={{
          border: "1px solid",
          borderColor: "#A9A9A9",
          backgroundColor: "#fafafa",
          paddingTop: "20px",
          paddingLeft: "20px",
          borderRadius: "10px",
        }}
      >
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
        <Col xs={24} sm={24} md={9} lg={9} xl={9} style={{marginLeft:"1%"}}>
          <Form.Item
            label="Đến ngày"
            allowClear={false}
            style={{
              marginLeft: screens.xl || screens.lg || screens.md ? "1%" : null,
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
          <Button
            style={{ marginRight: "5%" }}
            type="primary"
            onClick={handleStatistical}
          >
            Thống kê
          </Button>
        </Col>
      </Row>
      <Row
        style={{
          border: "1px solid",
          alignContent: "center",
          borderColor: "#A9A9A9",
          backgroundColor: "#fafafa",
          borderRadius: "10px",
          paddingLeft: "3%",
          marginTop: "1%",
        }}
      >
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={6}
          xl={4}
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
              <Statistic
                title={"Đôi tượng tiêm"}
                value={numberObject}
              ></Statistic>
            </Space>
          </Card>
        </Col>
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={5}
          xl={4}
          style={{ width: "80%", margin: "1%" }}
        >
          <Card>
            <Space direction="horizontal">
              <FontAwesomeIcon
                icon={faSyringe}
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic
                title={"   Vắc xin tồn cũ"}
                value={numberOldVaccine}
              ></Statistic>
            </Space>
          </Card>
        </Col>
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={6}
          xl={5}
          style={{ width: "80%", margin: "1%" }}
        >
          <Card>
            <Space direction="horizontal">
              <FontAwesomeIcon
                icon={faSyringe}
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic
                title={"Vắc xin tồn mới nhập"}
                value={numberNewVaccine}
              ></Statistic>
            </Space>
          </Card>
        </Col>
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={5}
          xl={4}
          style={{ width: "80%", margin: "1%" }}
        >
          <Card>
            <Space direction="horizontal">
              <FontAwesomeIcon
                icon={faSyringe}
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic
                title={"Vắc xin sử dụng"}
                value={numberVaccineInjected}
              ></Statistic>
            </Space>
          </Card>
        </Col>
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={5}
          xl={4}
          style={{ width: "80%", margin: "1%" }}
        >
          <Card>
            <Space direction="horizontal">
              <FontAwesomeIcon
                icon={faStarOfLife}
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic
                title={"Ca có phản ứng"}
                value={numberObjectReaction}
              ></Statistic>
            </Space>
          </Card>
        </Col>
      </Row>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        Thống kê từng loại vắc xin
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fafafa",
          border: "1px solid",
          borderColor: "#A9A9A9",
          borderRadius: "10px",
          marginTop: "20px",
          padding: "10px",
          paddingLeft: "20px",
          textAlign: "center",
        }}
      >
        <Table
          className="custom-header"
          style={{
            border: "3px solid",
            borderRadius: "12px",
            borderColor: "#337ab7",
            width: "80%",
          }}
          // loading={isLoading}
          showSorterTooltip={{ target: "sorter-icon" }}
          columns={columns}
          dataSource={listNumberVaccineStatistical}
          rowKey="id"
        />

        <LoadingModal showLoading={showLoading}></LoadingModal>
      </div>
    </App>
  );
}

export default Statistical;
