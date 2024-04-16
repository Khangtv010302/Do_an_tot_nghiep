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
  Select
} from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { render } from "react-dom";

function Staff() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  const queryClient = useQueryClient();
  //response
  const [response, setResponse] = useState();

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoType"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/API/HealthcareStaff")
        .then((res) => res.data.data),
  });
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
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
          
            onClick={() => {
              setIsModalOpen({ ...isModalOpen, Delete: true });
              handleUpdate(record);
            }}
          >
            <img className="openration" src="/public/assets/update.png"></img>
          </Button>
          <Button
          
            onClick={() => {
              setIsModalOpen({ ...isModalOpen, Delete: true });
              handleUpdate(record);
            }}
          >
            <img className="openration" src="/public/assets/detail.png"></img>
          </Button>
          <Button
          
            onClick={() => {
              setIsModalOpen({ ...isModalOpen, Delete: true });
            }}
          >
            <img className="openration" src="/public/assets/delete.png"></img>
          </Button>
        </Space>
      ),
    },
  ];
  const [openration,setOperation]= useState('');
  const [listRole,setListRole]=useState([]);
  const [listProvince,setListProvince]=useState([])
  const handleAdd = () =>{
    axios({
        method: "get",
        url: "https://vnprovinces.pythonanywhere.com/api/provinces?basic=true&limit=100",
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => {
        setListProvince(response.data.results)
    });
    axios({
        method: "get",
        url: "http://localhost:8080/API/Role",
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => {
        setListRole(response.data.data)
        console.log(response.data.data)
    });
    setOperation('Add');
  }
  const handleCancel= ()=>{
    setOperation('');
  }
  const [listDistricts,setListDistricts] = useState([]);
  const handleDistricts = (id)=>{
    axios({
        method: "get",
        url: `https://vnprovinces.pythonanywhere.com/api/provinces/${id}`,
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => {
        setListDistricts(response.data.districts)
        console.log(response.data.districts);
    });
  }
  const [listWards,setListWards] = useState([]);
  const handleWards = (id)=>{
    axios({
        method: "get",
        url: `https://vnprovinces.pythonanywhere.com/api/districts/${id}`,
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => {
        setListWards(response.data.wards)
        console.log(response.data);
    });
  }
  
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
          title="Thêm nhân viên"
          open={openration !== ''}
          onCancel={handleCancel}
          footer={null}
        >
             <Form
            onFinish={''}
            onFinishFailed={''}
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
              maxWidth: 600,
            }}
            // form={form}
          >
            <Form.Item
              label="Tên nhân viên"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên   ',
                },
              ]}
            > 
            {/* disabled={isModalOpen.Delete} */}
              <Input name="fullname" /> 
            </Form.Item>
            <Form.Item label="Giới tính" name="gender" initialValue="1">
            <Radio.Group >
                <Radio value="1"> Nam </Radio>
                <Radio value="0"> Nữ </Radio>
            </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập email',
                },
              ]}
            >
              <Input name="email"/>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại',
                },
              ]}
            >
              <Input name="phoneNumber"/>
            </Form.Item>
            <Form.Item label="Quyền hạn">
                <Select>
                {listRole.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                ))}
            </Select>
            </Form.Item>
            <Form.Item label="Tỉnh thành phố">
                <Select onSelect={(value)=>{
                    handleDistricts(value)
                }}>
                
                {listProvince.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name} </Select.Option>
                ))}
            </Select>
            </Form.Item>
            <Form.Item label="Quận huyện">
                <Select  onSelect={(value)=>{
                    handleWards(value)
                }}>
                {listDistricts.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                ))}
            </Select>
            </Form.Item>
            <Form.Item label="Xã phường">
                <Select>
                {listWards.map((item) => (
                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                ))}
            </Select>
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập username',
                },
              ]}
            >
              <Input name="phoneNumber"/>
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu',
                },
              ]}
            >
              <Input.Password name="password"/>
            </Form.Item>
            {openration==='Add' ?  
            <Form.Item
              label="Nhập lại Mật khẩu"
              name="rePassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu',
                },
              ]}
            >
              <Input.Password name="rePassword"/>
            </Form.Item>
             : null}
            <Form.Item label=" ">
              <div className="submit">
                <Button
                  style={{ textAlign: "right" }}
                  type="primary"
                  htmlType="submit"
                >
                  {/* {isModalOpen.Add === true ? "Thêm" : "Xóa"} */}
                  xóa
                </Button>
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
