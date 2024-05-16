import axios from "axios";
import { format } from "date-fns";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import App from "../App";
import "./Plan.css";
import {
  Space,
  Table,
  Input,
  Button,
  Modal,
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
import {
  faGear,
  faEye,
  faPencil,
  faTrashCan,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import LoadingModal from "../loading/Loading";


function Plan() {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  //alert
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  //Declare
  const [listVaccine, setListVaccine] = useState([]);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [page, setPage] = React.useState(1);
  const [response, setResponse] = useState([]);
  const dateFormat = "YYYY-MM-DD";
  const customLocale = {
    emptyText: '"Không có kế hoạch', // Change this to your custom message
  };
  const { Search } = Input;
  const [dataById, setDataById] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const today = new Date();
  const [form] = Form.useForm();
  const [subForm] = Form.useForm();
  const [operation, setOperation] = useState("");
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [firstDay, setFirstDay] = useState(formatDate(firstDayOfMonth));
  const [lastDay, setLastDay] = useState(formatDate(lastDayOfMonth));

  const columns = [
    {
      title: "#",
      dataIndex: "",
      width: "5%",
      key: "index",
      render: (_, __, index) => (
        <span style={{ fontSize: "12px" }}>{(page - 1) * 10 + index + 1}</span>
      ),
    },
    {
      title: "Đợt tiêm",
      dataIndex: "scheduledDate",
      key: "scheduledDate",
      width: "9%",
      render: (scheduledDate) => format(new Date(scheduledDate), "dd/MM/yyyy"),
    },
    {
      title: "Danh sách vắc xin",
      dataIndex: "vaccineId",
      responsive: ["md"],
      key: "vaccineId",
      render: (vaccineId) => {
        const matchedVaccines = listVaccine.filter((v) =>
          vaccineId.includes(v.id)
        );
        return (
          <Space>
            {matchedVaccines.map((vaccine) => vaccine.name).join(", ")}
          </Space>
        );
      },
    },
    {
      title: "Số ngày tiêm",
      dataIndex: "numberDate",
      responsive: ["lg"],
      key: "numberDate",
      width: "6%",
    },
    {
      title: "Địa điểm tiêm",
      dataIndex: "location",
      width: "20%",
      responsive: ["sm"],
      key: "location",
    },
    {
      title: "Tổng số đối tượng",
      dataIndex: "numberObject",
      responsive: ["lg"],
      width: "9%",
      key: "numberObject",
    },
    {
      title: "Hình thức",
      dataIndex: "form",
      responsive: ["sm"],
      width: "10%",
      key: "form",
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      responsive: ["sm"],
      width: "10%",
      key: "state",
      render: (state) => (state ? "Đã kết thúc" : "Chưa kết thúc"),
    },
    {
      title: <span style={{ fontSize: "14px" }}>Thao tác</span>,
      width: "8%",
      key: "action",
      render: (_, record) =>  {
        const itemsWithRecord = (record) => [  {
          key: "1",
          label: (
            <div  className="button-operation" onClick={()=>handleDetail(record)} >
              <span className="button-operation-text">Xem chi tiết</span>
              <div style={{ flexGrow: "1" }}></div>
              <FontAwesomeIcon className="button-operation-icon" icon={faEye} />
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div className="button-operation" onClick={()=>handleUpdate(record)}>
              <FontAwesomeIcon />
    
              <span className="button-operation-text">Cập nhật</span>
              <div style={{ flexGrow: "1" }}></div>
              <FontAwesomeIcon className="button-operation-icon" icon={faPencil} />
            </div>
          ),
        },
        {
          key: "3",
          label: (
            <div  className="button-operation" onClick={()=>handleDelete(record)} >
              <FontAwesomeIcon />
    
              <span className="button-operation-text">Xóa</span>
              <div style={{ flexGrow: "1" }}></div>
              <FontAwesomeIcon
                className="button-operation-icon"
                icon={faTrashCan}
              />
            </div>
          ),
        },
        {
          key: "4",
          label: (
            <div className="button-operation" onClick={()=>handleReminder(record)}>
              <FontAwesomeIcon />
    
              <span className="button-operation-text">Nhắc hẹn</span>
              <div style={{ flexGrow: "1" }}></div>
              <FontAwesomeIcon
                className="button-operation-icon"
                icon={faBell}
              />
            </div>
          ),
        },
      ];
    
      return (
        <div style={{ textAlign: "center" }}>
          <Space size="middle" style={{cursor: "pointer"}}>
            <Dropdown menu={{ items: itemsWithRecord(record) }} placement="bottom" arrow >
              <FontAwesomeIcon icon={faGear} style={{ fontSize: "16px" }} />
            </Dropdown>
          </Space>
        </div>
      );
    },
    },
  ];

  useEffect(() => {
    getListVaccine();
  }, []);
  //query
  //tanStackQuerry
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoPlan"],
    queryFn: () =>
      axios({
        method: "get",
        url: "http://localhost:8080/API/Plan",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
        
        },
        params: { fromDay: firstDay, toDay: lastDay },
      }).then((response) => {
        console.log(response.data.data);
        setResponse(response.data.data);
        return response.data.data;
      }),
  });
  const addPlan = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Plan",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoPlan"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const updatePlan = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "put",
        url: "http://localhost:8080/API/Plan",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoPlan"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Chỉnh sửa thông tin thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const deletePlan = useMutation({
    mutationFn: (id) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/Plan",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
        },
        params:{id},
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoPlan"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Xóa kế hoạch thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  //function
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") !== null)
      return sessionStorage.getItem("jwtToken");
    if (Cookies.get("jwtToken") !== undefined) return Cookies.get("jwtToken");
  };
  const disabledDateFirstDay = (currentDate) => {
    const minDate = dayjs(firstDay, 'YYYY-MM-DD');
    return currentDate.isBefore(minDate, 'day');
};

  const handleReminder = (record) => {
    console.log(record);
    setOperation("Reminder");
    form.setFieldsValue(record);
    form.setFieldValue(
      "scheduledDate",
      dayjs(record.scheduledDate, "YYYY-MM-DD")
    );
  };
  const handleDelete = (record) => {
    console.log(record);
    setOperation("Delete");
    form.setFieldsValue(record);
    form.setFieldValue(
      "scheduledDate",
      dayjs(record.scheduledDate, "YYYY-MM-DD")
    );
  };
  const handleUpdate = (record) => {
    console.log(record);
    setOperation("Update");
    form.setFieldsValue(record);
    form.setFieldValue(
      "scheduledDate",
      dayjs(record.scheduledDate, "YYYY-MM-DD")
    );
  };
  const handleDetail = (record) => {
    console.log(record);
    setOperation("Detail");
    form.setFieldsValue(record);
    form.setFieldValue(
      "scheduledDate",
      dayjs(record.scheduledDate, "YYYY-MM-DD")
    );
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
  const handleAdd = () => {
    form.resetFields();
    setOperation("Add");
  };
  const searchPlan = useMutation({
    mutationFn: () => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/Plan",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
        },
        params: { fromDay: firstDay, toDay: lastDay },
      }).then((response) => {
        console.log(response.data.data);
        setResponse(response.data.data);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoPlan"] });
      setShowLoading(false);
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const handleCancel = () => {
    setOperation("");
  };
  const handleSearch = () => {
    console.log(firstDay);
    console.log(lastDay);
    setShowLoading(true);
    searchPlan.mutate();
  };
  function onFinish(values) {
    values = {
      ...values,
      scheduledDate: values.scheduledDate.format("YYYY-MM-DD"),
    };
    console.log(values);
    if (operation === "Add") {
      setShowLoading(true);
      addPlan.mutate(values);
    }
    if (operation === "Update") {
      setShowLoading(true);
      updatePlan.mutate(values);
    }
    if (operation === "Delete") {
      setShowLoading(true);
      deletePlan.mutate(values.id)
     
    }
  }
  const onFinishFailed = (errorInfo) => {
    openNotification("Thất bại", "Không thể thêm kế hoạch");
  };

  return (
    <App onChose={"Plan"}>
      {contextHolder}
      <Row style={{ border: "1px solid",borderColor:"#A9A9A9" }}>
        <Col span={24}>
          <Row>
            <Col span={10}>
              <div
                style={{ margin: "3%", fontSize: "150%", fontWeight: "500" }}
              >
                Kế hoạch tiêm chủng
              </div>
            </Col>
            <Col span={14} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                style={{ margin: "3%" }}
                className="button-add"
                onClick={handleAdd}
              >
                Lập kế hoạch tiêm chủng
              </Button>
            </Col>
          </Row>
        </Col>
        <Col
          span={24}
          style={{ borderTop: "1px solid",borderColor:"#A9A9A9", padding: "1%", paddingTop: "2%" }}
        >
          <Row>
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
                    screens.xl || screens.lg || screens.md ? "2%" : null,
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
                Tìm kiếm kế hoạch tiêm
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ border: "1px solid",borderColor:"#A9A9A9", marginTop: "1%" }}>
        <Col
          span={24}
          style={{ margin: "1%", fontSize: "150%", fontWeight: "500" }}
        >
          Danh sách kế hoạch tiêm
        </Col>
        <Col span={24} style={{ borderTop: "1px solid",borderColor:"#A9A9A9" }}>
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
      <Modal
        title={
          operation === "Detail" || operation ==="Delete"
            ? "Thông tin kế hoạch"
            : operation === "Add"
            ? "Thêm kế hoạch"
            : operation === "Update"
            ? "Cập nhật kế hoạch"
            : operation === "Reminder"
            ? "Nhắc hẹn lịch tiêm chủng"
            : null
        }
        open={operation !== ""}
        onCancel={handleCancel}
        footer={null}
        width={750}
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="wrap"
          labelCol={{
            flex: "160px",
          }}
          labelAlign="left"
          layout="vertical"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            marginTop: "2%",
            maxWidth: 750,
          }}
          form={form}
        >
          {operation !== "Add" || operation !== "Detail" ? (
            <Form.Item style={{ display: "none" }} name="id"></Form.Item>
          ) : null}
          <Row>
            <Col span={screens.xs ? 8 :6} style={{ marginLeft: "4%" }}>
              <Form.Item
                labelCol={1}
                label="Đợt tiêm"
                name="scheduledDate"
                initialValue={dayjs()}
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn đợt tiêm",
                  },
                ]}
              >
                <DatePicker
                //  disabledDate={disabledDate}
                  preserveInvalidOnBlur={true}
                  format={"DD/MM/YYYY"}
                  style={
                    operation === "Detail" || operation === "Delete"
                      ? { pointerEvents: "none" }
                      : {}
                  }
                  onChange={(e) => {
                    console.log(e.format("DD-MM-YYYY"));
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={screens.xs ? 8 :6} style={{ marginLeft: "4%" }}>
              <Form.Item
                labelCol={1}
                initialValue={"TYT Vĩnh Thọ"}
                label="Địa điểm:"
                wrapperCol={1}
                name="location"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa điểm tiêm",
                  },
                ]}
              >
                <Input
                  name="location"
                  readOnly={operation !== "Add" && operation !== "Update"}
                />
              </Form.Item>
            </Col>
            <Col   span={screens.xs ? 8 :5} style={{ marginLeft: "4%" }}>
              <Form.Item
                initialValue={"Thường xuyên"}
                labelCol={1}
                label="Hình thức tiêm:"
                name="form"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hình thức tiêm",
                  },
                ]}
              >
                <Select
                  style={{
                    pointerEvents:
                      operation !== "Add" && operation !== "Update"
                        ? "none"
                        : null,
                  }}
                >
                  <Select.Option value="Chiến dịch">Chiến dịch</Select.Option>
                  <Select.Option value="Thường xuyên">
                    Thường xuyên
                  </Select.Option>
                  <Select.Option value="Dịch vụ">Dịch vụ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={screens.xs ? 8 :6} style={{ marginLeft: "4%" }}>
              <Form.Item
                labelCol={1}
                initialValue={1}
                label="Số ngày tiêm:"
                wrapperCol={1}
                name="numberDate"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số ngày tiêm",
                  },
                ]}
              >
                <Input
                  type="Number"
                  style={{ width: "30%" }}
                  name="numberDate"
                  readOnly={operation !== "Add" && operation !== "Update"}
                />
              </Form.Item>
            </Col>
            <Col span={screens.xs ? 8 :6} style={{ marginLeft: "4%" }}>
              <Form.Item
                labelCol={1}
                label="Tổng số đối tượng:"
                wrapperCol={1}
                name="numberObject"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tổng số đối tượng tiêm",
                  },
                ]}
              >
                <Input
                  type="Number"
                  style={{ width: "50%" }}
                  name="numberObject"
                  readOnly={operation !== "Add" && operation !== "Update"}
                />
              </Form.Item>
            </Col>
            <Col span={screens.xs ? 8 :5} style={{ marginLeft: "4%" }}>
              <Form.Item
                initialValue={false}
                labelCol={1}
                label="Trạng thái:"
                name="state"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn trạng thái",
                  },
                ]}
              >
                <Select
                  style={{
                    pointerEvents:
                      operation !== "Add" && operation !== "Update"
                        ? "none"
                        : null,
                  }}
                >
                  <Select.Option value={true}>Đã kết thúc</Select.Option>
                  <Select.Option value={false}>Chưa kết thúc</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginLeft: "4%" }}>
              <Form.Item
                labelCol={1}
                label="Danh sách vaccine:"
                name="vaccineId"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn vắc xin",
                  },
                ]}
              >
                <Checkbox.Group
       
         
                  style={
                    operation === "Detail" || operation==="Delete" ? {pointerEvents:"none"}:{}
                  }
                >
                  <Row>
                    {listVaccine.map((item) => (
                      <Col span={8} key={item.id}>
                        <Checkbox value={item.id}>{item.name}  </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              {operation === "Delete" ? (
                <div
                  style={{
                    color: "#ff0f0f",
                    fontSize: "20px",
                    fontWeight: "bold",
                    paddingLeft: "2%",
                  }}
                >
                  {" "}
                  Bạn có muốn xóa kế hoạch này !!
                </div>
              ) : null}
            </Col>
            <Col span={12}>
              <div className="submit">
                {operation === "Detail" ? null : (
                  <Button
                    style={{
                      marginRight: "1%",

                      marginBottom: "1%",
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    {operation === "Add" ? "Thêm" : null}
                    {operation === "Update"
                      ? "Xác nhận chỉnh sửa thông tin"
                      : null}
                    {operation === "Delete" ? "Xóa" : null}
                    {operation === "Reminder" ? "Nhắc hẹn" : null}
                  </Button>
                )}
                <Button
                  style={{
                    textAlign: "right",
                    marginLeft: "1%",
                    marginRight: "1%",
                    color: "#4d79ff",
                    fontWeight: "500",
                    backgroundColor: "#f2f2f2",
                  }}
                  onClick={handleCancel}
                >
                  Quay lại
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
     
      <LoadingModal showLoading={showLoading} />
    </App>
  );
}

export default Plan;
