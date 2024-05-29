import axios from "axios";
import { format } from "date-fns";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import App from "../App";
import Cookies from 'js-cookie'
import "./object.css";
import {
  
  Table,
  Input,
  Button,

  Form,
  notification,

  Select,
  Switch,
  Menu,
  Row,
  Col,
  Grid,
  DatePicker,
  
} from "antd";
import {
  faPlus,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingModal from "../loading/Loading";
import ObjectSchedule from "../object_schedule/Object_Schedule";

function Objects() {
  //Declare
  const [searchInfo,setSearchInfo]= useState("");
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [page, setPage] = React.useState(1);
  const [response, setResponse] = useState([]);
  const customLocale = {
    emptyText: '"Không có đối tượng', // Change this to your custom message
  };
  const { Search } = Input;
  const [dataById, setDataById] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [form] = Form.useForm();
  const [operation, setOperation] = useState("");
  const [onSelected, setOnSelected] = useState("");

  //alert
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  const items = [
    {
      label: "Thông tin cá nhân",
      key: "object",
    },
    {
      label: "Sổ tiêm chủng",
      key: "schedule",
    },
  ];
  //tanStackQuerry
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["repoObject"],
    queryFn: () =>
      axios.get("http://localhost:8080/API/Object/Info", {
    headers: {
      Authorization: `Bearer ${getJwtToken()}` 
    },
    params:{info:searchInfo}
  }).then((res) => {
        setResponse(res.data.data);
        return res.data.data;
      }),
  });
  const searchObject = useMutation({
    mutationFn: (info) => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/Object/Info",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}` 
        },
        params: { info },
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
      openNotification("Thất bại", error.response.data.message);
    },
  });

  const addObject = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Object",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}` 
        },
        data: values,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoObject"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const updateObject = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "put",
        url: "http://localhost:8080/API/Object",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}` 
        },
        data: values,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoObject"] });
      setShowLoading(false);
      setOperation("Detail");
      openNotification("Thành công", "Đã chỉnh sửa thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const deleteObject = useMutation({
    mutationFn: (id) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/Object",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}` 
        },
        params: {
          id,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoObject"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Đã xóa khỏi danh sách");
    },
    onError: (error) => {
      console.log(error.response.data);
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  
  const columns = [
    {
      title: "#",
      dataIndex: "",
      width: "12%",
      key: "index",
      render: (_, __, index) => (
        <span style={{ fontSize: "12px" }}>{(page - 1) * 10 + index + 1}</span>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      width: "22%",
      render: (sex) => (
        <div
          style={{ textAlign: "center", fontSize: "150%" }}
          className={`gender-icon ${sex ? "male" : "female"}`}
        >
          {sex ? "♂️" : "♀"}
        </div>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthDate",
      key: "birthDate",
      width: "30%",
      render: (birthDate) => format(new Date(birthDate), "dd/MM/yyyy"),
      sorter: (a, b) => new Date(a.birthDate) - new Date(b.birthDate),
    },
    
  ];

  //fucntion
  const getJwtToken = ()=>{
   if (sessionStorage.getItem("jwtToken") !== null)
      return sessionStorage.getItem("jwtToken");
    if(Cookies.get("jwtToken") !== undefined)
      return Cookies.get("jwtToken");
  }
  

  const handleChange = (e) => {
    setShowLoading(true);
    if (e.key === "object") {
      handleDetail(dataById);
      setShowLoading(false);
    } else {
      setOnSelected("schedule");
      setShowLoading(false);
    }
  };
  const handleAdd = () => {
    setOnSelected("object");
    form.resetFields();
    setOperation("Add");
  };
  const handleDelete = () => {
    setOnSelected("object");
    console.log(dataById);
    form.setFieldsValue({
      id: dataById.id,
      fullname: dataById.fullname,
      addressDetail: dataById.addressDetail,
      birthDate: dayjs(dataById.birthDate, "YYYY-MM-DD"),
      email: dataById.email,
      ethnicGroup: dataById.ethnicGroup,
      guardianCard: dataById.guardianCard,
      guardianName: dataById.guardianName,
      guardianPhoneNumber: dataById.guardianPhoneNumber,
      guardianYearBirth: dataById.guardianYearBirth,
      guardianType: dataById.guardianType,
      note: dataById.note,
      placeOfResidence: dataById.placeOfResidence,
      reminder: dataById.reminder,
      sex: dataById.sex,
    });
    setOperation("Delete");
  };
  const handleUpdate = () => {
    setOnSelected("object");
    console.log(dataById);
    form.setFieldsValue({
      id: dataById.id,
      fullname: dataById.fullname,
      addressDetail: dataById.addressDetail,
      birthDate: dayjs(dataById.birthDate, "YYYY-MM-DD"),
      email: dataById.email,
      ethnicGroup: dataById.ethnicGroup,
      guardianCard: dataById.guardianCard,
      guardianName: dataById.guardianName,
      guardianPhoneNumber: dataById.guardianPhoneNumber,
      guardianYearBirth: dataById.guardianYearBirth,
      guardianType: dataById.guardianType,
      note: dataById.note,
      placeOfResidence: dataById.placeOfResidence,
      reminder: dataById.reminder,
      sex: dataById.sex,
    });

    setOperation("Update");
  };
  const handleCancel = () => {
    if(operation!=="Add")
    handleDetail(dataById);
  else setOperation("");
  };
  function onFinish(values) {
    values = {
      ...values,
      birthDate: values.birthDate.format("YYYY-MM-DD"),
    };
    if (operation === "Add") {
      if (!values.reminder)
        values = {
          ...values,
          reminder: false,
        };
      setShowLoading(true);
      addObject.mutate(values);
      setDataById(values);
    }
    if (operation === "Update") {
      setShowLoading(true);
      setDataById(values);
      updateObject.mutate(values);
    }
    if (operation === "Delete") {
      setShowLoading(true);
      deleteObject.mutate(dataById.id);
    }
  }

  const handleDetail = (record) => {
    setOnSelected("object");
    setDataById(record);
    form.setFieldsValue({
      id: record.id,
      fullname: record.fullname,
      addressDetail: record.addressDetail,
      birthDate: dayjs(record.birthDate, "YYYY-MM-DD"),
      email: record.email,
      ethnicGroup: record.ethnicGroup,
      guardianCard: record.guardianCard,
      guardianName: record.guardianName,
      guardianPhoneNumber: record.guardianPhoneNumber,
      guardianYearBirth: record.guardianYearBirth,
      guardianType: record.guardianType,
      note: record.note,
      placeOfResidence: record.placeOfResidence,
      reminder: record.reminder,
      sex: record.sex,
    });
    setShowLoading(false);
    setOperation("Detail");
  };
  const onFinishFailed = () => {
    openNotification("Thất bại", "Không thể thêm nhân viên");
  };
  return (
    <App onChose={"Object"}>
      {contextHolder}
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={8} style={{border: "1px solid",borderColor:"#A9A9A9" }}>
          <div style={{ width: "100%"}}>
            <div style={{ width: "100%", margin: "2%" }}>
              <Search
                allowClear={true}
                placeholder="Nhập tên đối tượng tên người giám hộ"
                onSearch={(value, _e, info) => {
                  console.log(info?.source, value);
                  setShowLoading(true);
                  setSearchInfo(value)
                  searchObject.mutate(value);
                  setOperation("");
                }}
                style={{
                  width: "90%",
                }}
              />
            </div>
          </div>
          <div style={{ width: "100%", borderTop: "1px solid", borderColor:"#A9A9A9", }}>
            <Table
              scroll={{ x: 120, y: 400 }}
              rowClassName="table-row"
              onRow={(record) => {
                return {
                  onClick: () => {
                    setShowLoading(true);
                
                    setDataById({ record });
                    handleDetail(record);
                  },
                };
              }}
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
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={15}
          style={screens.xl ? { marginLeft: "1%" } : { marginTop: "2%" }}
        >
          <div style={{ width: "100%", border: "1px solid",borderColor:"#A9A9A9" }}>
            <Row>
              <Col span={12}>
                <div
                  style={{
                    margin: "10px",
                    fontSize: "150%",
                    fontWeight: "600",
                  }}
                >
                  Thông tin đối tượng tiêm
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: "right", margin: "15px" }}>
                  {operation !== "Add" ? (
                    <Button
                      onClick={handleAdd}
                      style={{
                        textAlign: "center",
                        width: "20%",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                      type="primary"
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ marginRight: "5px" }}
                      />
                      Thêm
                    </Button>
                  ) : null}

                  {operation !== "Add" && operation !== "" ? (
                    <Button
                      onClick={handleUpdate}
                      style={{
                        textAlign: "center",
                        width: "20%",
                        fontSize: "12px",
                        marginLeft: "5px",
                        fontWeight: "500",
                      }}
                      type="primary"
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{ marginRight: "5px" }}
                      />
                      Sửa
                    </Button>
                  ) : null}

                  {operation !== "Add" && operation !== "" ? (
                    <Button
                      onClick={handleDelete}
                      style={{
                        textAlign: "center",
                        width: "20%",
                        fontSize: "12px",
                        marginLeft: "5px",
                        fontWeight: "500",
                      }}
                      type="primary"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ marginRight: "5px" }}
                      />
                      Xóa
                    </Button>
                  ) : null}
                </div>
              </Col>
            </Row>
            {operation !== "" ? (
              <div style={{ width: "100%", borderTop: "1px solid",borderColor:"#A9A9A9" }}>
                <Menu
                  onClick={handleChange}
                  selectedKeys={[onSelected]}
                  mode="horizontal"
                  items={items}
                />
                {onSelected === "object" ? (
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
                      maxWidth: 1000,
                    }}
                    form={form}
                  >
                    <Row>
                      <Col span={8} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Tên đối tượng:"
                          name="fullname"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên đối tượng",
                            },
                          ]}
                        >
                          <Input
                            name="fullname"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                        {operation !== "Add" ? (
                          <Form.Item
                            style={{ display: "none" }}
                            name="id"
                          ></Form.Item>
                        ) : null}
                      </Col>
                      <Col span={3} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          initialValue={true}
                          labelCol={1}
                          label="Giới tính:"
                          name="sex"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn giới tính",
                            },
                          ]}
                        >
                          <Select
                           style={
                            operation === "Detail" || operation === "Delete"
                              ? { pointerEvents: "none" }
                              : {}
                          }
                          >
                            <Select.Option value={true}>Nam</Select.Option>
                            <Select.Option value={false}>Nữ</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={3} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Dân tộc:"
                          wrapperCol={1}
                          name="ethnicGroup"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên đối tượng",
                            },
                          ]}
                        >
                          <Input
                            name="ethnicGroup"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          label="Ngày sinh"
                          labelCol={1}
                          name="birthDate"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập ngày sinh",
                            },
                          ]}
                        >
                          <DatePicker
                            format={"DD/MM/YYYY"}
                            onChange={(e) => {
                              console.log(e.format("DD-MM-YYYY"));
                            }}
                            style={
                              operation === "Detail" || operation === "Delete"
                                ? { pointerEvents: "none" }
                                : {}
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={9} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Địa chỉ thường trú:"
                          wrapperCol={1}
                          name="placeOfResidence"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên đối tượng",
                            },
                          ]}
                        >
                          <Input
                            name="placeOfResidence"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Địa chỉ chi tiết"
                          wrapperCol={1}
                          name="addressDetail"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên đối tượng",
                            },
                          ]}
                        >
                          <Input
                            name="addressDetail"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Tên người giám hộ"
                          wrapperCol={1}
                          name="guardianName"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập tên người giám hộ",
                            },
                          ]}
                        >
                          <Input
                            name="guardianName"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Email"
                          wrapperCol={1}
                          name="email"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập email",
                            },
                            {
                              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Email không đúng định đạng",
                            },
                          ]}
                        >
                          <Input
                            name="email"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Người giám hộ"
                          wrapperCol={1}
                          name="guardianType"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập người giám hộ",
                            },
                          ]}
                        >
                          <Select
                            style={
                              operation === "Detail" || operation === "Delete"
                                ? { pointerEvents: "none" }
                                : {}
                            }
                          >
                            <Select.Option value="Cha">Cha</Select.Option>
                            <Select.Option value="Mẹ">Mẹ</Select.Option>
                            <Select.Option value="Ông/bà">Ông/bà</Select.Option>
                            <Select.Option value="Cô/Chú">Cô/chú</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                   
                     
                      <Col span={3} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Năm sinh"
                          wrapperCol={1}
                          name="guardianYearBirth"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập năm sinh",
                            },
                            {
                              pattern: /^[0-9]*$/,
                              message: "Chỉ nhập số",
                            },
                          ]}
                        >
                          <Input
                          maxLength={4}
                            name="guardianYearBirth"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Số điện thoại"
                          wrapperCol={1}
                          name="guardianPhoneNumber"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập số điện thoại",
                            },
                            {
                              pattern: /^[0-9]*$/,
                              message: "Chỉ nhập số",
                            },
                          ]}
                        >
                          <Input
                          maxLength={12}
                            name="guardianPhoneNumber"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={7} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="CMT/CCCD"
                 
                          wrapperCol={1}
                          name="guardianCard"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                          rules={[
                            {
                              required: true,
                              message:
                                "Vui lòng nhập số CMT/CCCD/ Mã định danh cá nhân",
                            },
                            {
                              pattern: /^[0-9]*$/,
                              message: "Chỉ nhập số",
                            },
                          ]}
                        >
                          <Input
                                   maxLength={20}
                            name="guardianCard"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={5} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          name="reminder"
                          labelCol={1}
                          label="Hẹn tiêm"
                          initialValue={true}
                          valuePropName="checked"
                        >
                          <Switch
                            style={
                              operation === "Detail" || operation === "Delete"
                                ? { pointerEvents: "none" }
                                : {}
                            }
                            className="custom-switch"
                            checkedChildren="Đang bật"
                            unCheckedChildren="Đang tắt"
                            defaultChecked={true}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={22} style={{ marginLeft: "4%" }}>
                        <Form.Item
                          labelCol={1}
                          label="Ghi chú"
                          wrapperCol={1}
                          name="note"
                          style={{
                            width: "100%", // Adjust width as needed
                          }}
                        >
                          <Input
                            name="note"
                            readOnly={
                              operation !== "Add" && operation !== "Update"
                            }
                          />
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
                            Bạn có muốn xóa đối tượng này !!
                          </div>
                        ) : null}
                      </Col>
                      <Col span={12}>
                        {operation === "Detail" ? null : (
                          <div className="submit">
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
                            </Button>
                            <Button
                              style={{
                                textAlign: "right",
                                marginLeft: "1%",
                                marginRight: "1%",
                                color: "#4d79ff",
                                fontWeight: "500",
                                backgroundColor: "#f2f2f2",
                              }}
                              type="primary"
                              onClick={handleCancel}
                            >
                              Quay lại
                            </Button>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Form>
                ) : (
                  <ObjectSchedule 
                  objectId={dataById.id}  />
                )}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid", 
                  borderColor:"#A9A9A9",
                  height: "20%",
                  paddingLeft: "1%",
                  paddingTop: "1%",
                }}
              >
                {" "}
                Chọn một đối tượng để xem thông tin{" "}
              </div>
            )}
          </div>
        </Col>
      </Row>

      <LoadingModal showLoading={showLoading} />
     
    </App>
  );
}

export default Objects;
