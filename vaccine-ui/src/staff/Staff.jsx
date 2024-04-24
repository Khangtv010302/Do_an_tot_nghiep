import axios, { Axios } from "axios";
import App from "../App";
import "./Staff.css";
import {
  Space,
  Table,
  Input,
  Button,
  Modal,
  Form,
  notification,
  Radio,
  Select,
  Row,
  Col,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { render } from "react-dom";

function Staff() {
  //alert
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  const queryClient = useQueryClient();
  //tanStackQuerry
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoStaff"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/API/HealthcareStaff")
        .then((res) => res.data.data),
  });
  //Add Staff
  const addStaff = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/HealthcareStaff",
        headers: {
          "Content-type": "application/json",
        },
        data: values,
      }).then((response) => setResponse(response));
    },
    // isLoading: ()=>{
    //   openNotification("DDa", "Đã thêm vào danh sách");
    // }
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStaff"] });
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
    },
  });
  //Add Staff
  const updateStaff = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "put",
        url: "http://localhost:8080/API/HealthcareStaff",
        headers: {
          "Content-type": "application/json",
        },
        data: values,
      }).then((response) => setResponse(response));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStaff"] });
      openNotification("Thành công", "Đã sủa thông tin");
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const deleteStaff = useMutation({
    mutationFn: (id) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/HealthcareStaff",
        headers: {
          "Content-type": "application/json",
        },
        params:{id}
      }).then((response) => setResponse(response));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStaff"] });
      openNotification("Thành công", "Đã sủa thông tin");
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
    },
  });
  //Declare variable
  const [response, setResponse] = useState();
  const [operation, setOperation] = useState("");
  const [listRole, setListRole] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [form] = Form.useForm();
  const [dataById,setDataById]=useState({
    id:'',
    fullname:'',
    sex: '',
    email:'',
    phoneNumber:'',
    username:'',
    role:'',
    address:''
  });
  //table Header

  const getListRole = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/Role",
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      setListRole(response.data.data);
    });
  };
  
  const columns = [
    {
      title: "Tên nhân viên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      render: (sex) => (sex === true ? "Nam" : "Nữ"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Quyền",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      //operation
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Sửa" color={"blue"}>
            <Button
              onClick={() => {
                handleUpdate(record);
              }}
            >
              <img className="operation" src="/public/assets/update.png"></img>
            </Button>
          </Tooltip>
          <Tooltip title="Xem chi tiết" color={"blue"}>
            <Button
             onClick={() => {
              handleDetail(record);
            }}
            >
              <img className="operation" src="/public/assets/detail.png"></img>
            </Button>
          </Tooltip>
          <Tooltip title="Xóa" color={"blue"}>
            <Button
             onClick={() => {
              handleDelete(record);
            }}
            >
              <img className="operation" src="/public/assets/delete.png"></img>
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const handleAdd = () => {
    form.resetFields();
    getListRole();
    setOperation("Add");
  };
  const handleCancel = () => {
    setOperation("");
  };
  //Onfinish
  function onFinish(values) {
    if (operation === "Add") {
      console.log(values);
      addStaff.mutate(values);
    }
    if (operation === "Update") {
      updateStaff.mutate(values);
    }
    if (operation === "Delete") {
      console.log(dataById.id);
      deleteStaff.mutate(dataById.id);
    }
    setOperation("");
  }
  const onFinishFailed = (errorInfo) => {
    openNotification("Thất bại", "Không thể thêm nhân viên");
  };
  const validateRePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Mật khẩu không khớp"));
    },
  });

  const handleUpdate = async (record) => {
    getListRole()
    let sex = "";
    if (record.sex === true) {
      sex = "true";
    } else {
      sex = "false";
    }
    form.setFieldsValue({
      fullname: record.fullname,
      sex: sex,
      email: record.email,
      phoneNumber: record.phoneNumber,
      placeOfResidence: record.placeOfResidence,
      roleId: record.roleId,
      id: record.id,
      username: record.username,
    });
    setOperation("Update");
  };
  const handleDetail =  (record) => {
    getListRole();
    const role = listRole.filter(role => role.id === record.roleId ? role.name : null);
    let sex = "";
    if (record.sex === true) {
      sex = "Nam";
    } else {
      sex = "Nữ";
    }
    setDataById({
      id:record.id,
      fullname:record.fullname,
      sex: sex,
      email:record.email,
      phoneNumber:record.phoneNumber,
      username:record.username,
      role:role[0].name,
      address:record.placeOfResidence
    })
    setOperation("Detail");
  };
  const handleDelete =  (record) => {
    getListRole()
    const role = listRole.filter(role => role.id === record.roleId ? role.name : null);
    let sex = "";
    if (record.sex === true) {
      sex = "Nam";
    } else {
      sex = "Nữ";
    }
    setDataById({
      id:record.id,
      fullname:record.fullname,
      sex: sex,
      email:record.email,
      phoneNumber:record.phoneNumber,
      username:record.username,
      role:role[0].name,
      address:record.placeOfResidence
    })
    console.log(operation);
    setOperation("Delete");
  };
  return (
    <App>
      {contextHolder}
      <h2 className="header">Quản lý nhân viên</h2>
      <div className="center">
        <Button
          type="primary"
          onClick={handleAdd}
          style={{
            marginBottom: "1%",
            textAlign: "left",
          }}
        >
          Thêm
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{
            defaultPageSize: 5,
            position: ["bottomCenter"],
          }}
        />
      </div>
      <Modal
        title={
          operation === "Add"
            ? "Thêm nhân viên"
            : operation === "Update"
            ? "Sửa thông tin nhân viên"
            : null
        }
        open={operation === "Add" || operation === "Update"}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="wrap"
          labelCol={{
            flex: "140px",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            maxWidth: 700,
          }}
          form={form}
        >
          <Form.Item name="id" style={{display:"none"}}></Form.Item>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Tên nhân viên:"
                name="fullname"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}
              >
               <Input readOnly={operation !== "Add" && operation !== "Update"}   readOnly={operation !== "Add" && operation !== "Update"}  name="fullname" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giới tính:"
                name="sex"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính",
                  },
                ]}
              >
                <Radio.Group style={{ marginLeft: "-40px" }}  disabled={operation !== "Add" && operation !== "Update"}>
                  <Radio value="true" >Nam</Radio>
                  <Radio value="false">Nữ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Email:"
                name="email"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  },
                ]}
              >
               <Input readOnly={operation !== "Add" && operation !== "Update"}   name="email" type="email" size="30" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại:"
                name="phoneNumber"
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
               <Input readOnly={operation !== "Add" && operation !== "Update"}  
                  name="phoneNumber"
                  type="text"
                  style={{ marginLeft: "-40px" }}
                  maxlength="20"
                  size="20"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Username:"
                name="username"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập username",
                  },
                ]}
              >
               <Input readOnly={operation !== "Add" && operation !== "Update"} 
                  disabled={operation !== "Add"}
                  name="username"
                  maxLength="30"
                  size="30"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Vai trò:"
                name="roleId"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn vai trò",
                  },
                ]}
              >
                <Select style={{ marginLeft: "-40px" }} disabled={operation !== "Add" && operation !== "Update"}>
                  {listRole.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Địa chỉ:"
            name="placeOfResidence"
            style={{
              width: "80%", // Adjust width as needed
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập username",
              },
            ]}
          >
           <Input readOnly={operation !== "Add" && operation !== "Update"}  name="placeOfResidence" maxLength="30" size="30" />
          </Form.Item>
          {operation === "Add" ? (
            <Form.Item
              label="Mật khẩu:"
              name="password"
              style={{
                width: "50%", // Adjust width as needed
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
                {
                  pattern: /^(?=.*[A-Z])[A-Za-z0-9]*$/,
                  message:
                    "Mật khẩu phải bắt đầu bằng chữ cái in hoa và chỉ chứa chữ cái và số",
                },
              ]}
            >
             <Input.Password  name="password" maxlength="30" size="30" />
            </Form.Item>
          ) : null}
          {operation === "Add" ? (
            <Form.Item
              label="Nhập lại Mật khẩu:"
              name="rePassword"
              style={{
                width: "50%", // Adjust width as needed
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
                validateRePassword,
              ]}
            >
             <Input.Password name="rePassword" maxlength="30" size="30" />
            </Form.Item>
          ) : null}
          <Form.Item label=" ">
            <div className="submit">
              {operation === "Detail" ? null : 
              <Button
              style={{ textAlign: "right" }}
              type="primary"
              htmlType="submit"
            >
              {operation === "Add" ? "Thêm" : null}
              {operation === "Update" ? "Sửa" : null}
              {operation === "Delete" ? "Xóa" : null}
            </Button>
              }
              
              <Button
                style={{ textAlign: "right", marginLeft: "10px" }}
                type="primary"
                onClick={handleCancel}
              >
                Quay lại
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          operation === "Detail"
            ? "Xem thông tin nhân viên"
            : operation === "Delete"
            ? "Xóa thông tin nhân viên"
            : null
        }
        open={operation === "Delete" || operation === "Detail"}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name="wrap"
          labelCol={{
            flex: "140px",
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon={false}
          style={{
            maxWidth: 700,
          }}
          form={form}
        >
          
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Tên nhân viên:"
                name="fullname"
                style={{
                  width: "100%", // Adjust width as needed
                }}
              >
                <text> {dataById.fullname} </text>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giới tính:"
                name="sex"
              >
                <text> {dataById.sex} </text>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Email:"
                name="email"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                
              >
               <text> {dataById.email} </text>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số điện thoại:"
                name="phoneNumber"
                style={{
                  width: "100%", // Adjust width as needed
                }}
              >
                <text> {dataById.phoneNumber} </text>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Username:"
                name="username"
                style={{
                  width: "100%", // Adjust width as needed
                }}
              
              >
              <text> {dataById.username} </text>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Vai trò:"
                name="roleId"
              >
                 <text> {dataById.role} </text>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Địa chỉ:"
            name="placeOfResidence"
            style={{
              width: "80%", // Adjust width as needed
            }}
          >
            <text> {dataById.address} </text>
              </Form.Item>
          {operation === "Add" ? (
            <Form.Item
              label="Mật khẩu:"
              name="password"
              style={{
                width: "50%", // Adjust width as needed
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
                {
                  pattern: /^(?=.*[A-Z])[A-Za-z0-9]*$/,
                  message:
                    "Mật khẩu phải bắt đầu bằng chữ cái in hoa và chỉ chứa chữ cái và số",
                },
              ]}
            >
             <Input  name="password" maxlength="30" size="30" />
            </Form.Item>
          ) : null}
          {operation === "Add" ? (
            <Form.Item
              label="Nhập lại Mật khẩu:"
              name="rePassword"
              style={{
                width: "50%", // Adjust width as needed
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
                validateRePassword,
              ]}
            >
             <Input.Password name="rePassword" maxlength="30" size="30" />
            </Form.Item>
          ) : null}
          <Form.Item name="id"style={{display:"none"}}></Form.Item>
          <Form.Item label=" ">
            <div className="submit">
              {operation === "Detail" ? null : 
              <Button
              style={{ textAlign: "right" }}
              type="primary"
              htmlType="submit"
            >
              {operation === "Add" ? "Thêm" : null}
              {operation === "Update" ? "Sửa" : null}
              {operation === "Delete" ? "Xóa" : null}
            </Button>
              }
              
              <Button
                style={{ textAlign: "right", marginLeft: "10px" }}
                type="primary"
                onClick={handleCancel}
              >
                Quay lại
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </App>
  );
}

export default Staff;
