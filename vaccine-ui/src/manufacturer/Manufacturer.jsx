import App from "../App";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import {
  Space,
  Table,
  Input,
  Button,
  Modal,
  Form,
  notification,
  Tooltip,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
function Manufacturer() {
   //alert 
   const [api, contextHolder] = notification.useNotification();
   const openNotification = (state, description) => {
     api.info({
       message: `${state}`,
       description: description,
     });
   };
  //declaire variable
  const [operation, setOperation] = useState("");
  const [response, setResponse] = useState();
  const [form] = Form.useForm();
  //tanstackquerry
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching, isSuccess } = useQuery({
    queryKey: ["repoManufacturer"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/API/Manufacturer")
        .then((res) => res.data.data),
  });
  const addManufacturer = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Manufacturer",
        headers: {
          "Content-type": "application/json",
        },
        data: values,
      }).then((response) => setResponse(response));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoManufacturer"] });
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const updateManufacturer = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "put",
        url: "http://localhost:8080/API/Manufacturer",
        headers: {
          "Content-type": "application/json",
        },
        data: values,
      }).then((response) => setResponse(response));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoManufacturer"] });
      openNotification("Thành công", "Chỉnh sửa thành công");
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const deleteManufacturer = useMutation({
    mutationFn: (id) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/Manufacturer",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          id,
        },
      }).then((response) => setResponse(response.data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoManufacturer"] });
      openNotification("Thành công", "Xóa thành công");
    },
    onError:(error) => {
      openNotification("Thất bại", error.response.data.message);
    }
  });
  //columns
  const columns =[{
    title: "Tên nhà cung cấp",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    render: (phoneNumber) => (
      phoneNumber.replace(/(\d{4})(\d{4})(\d{3})/, "$1 $2 $3")
    )
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },

  {
    //operation
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title="Sửa" color={"blue"} >
          <Button
            onClick={() => {
              handleUpdate(record);
            }}
          >
            <img className="operation" src="/public/assets/update.png"></img>
          </Button>
        </Tooltip>
        <Tooltip title="Xóa" color={"blue"} >
          <Button
            onClick={() => {
             handleDelete(record)
            }}
          >
            <img className="operation" src="/public/assets/delete.png"></img>
          </Button>
        </Tooltip>
      </Space>
    ),
  },
];
//useEffect

//function
const handleCancel = () => {
  setOperation("");
};
const handleAdd = () => {
   setOperation("Add");
   form.resetFields();
 };
function onFinish(values) {
  if (operation === "Add") {
    const manufacturer = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address,
    };
    addManufacturer.mutate(manufacturer);
  }
  if (operation === "Update") {
    const manufacturer = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address,
      id:values.id
    };
    updateManufacturer.mutate(manufacturer)
  }
  if (operation === "Delete") {
    deleteManufacturer.mutate(values.id)
  }
  setOperation("");
}
const onFinishFailed = (errorInfo) => {
  openNotification("Thất bại","Không thể thêm")
};
const handleUpdate = async (record) => {
    form.setFieldsValue({
      name:record.name,
      phoneNumber:record.phoneNumber,
      address:record.address,
      id:record.id,
    });
  setOperation('Update');
};
const handleDelete = async (record) => {
  form.setFieldsValue({
    name:record.name,
    phoneNumber:record.phoneNumber,
    address:record.address,
    id:record.id,
  });
  setOperation('Delete');
};
    return ( 
        <App>
             {contextHolder}
            <h2 className="header">Quản lý nhà cung cấp</h2>
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
         <Modal
        title={operation==='Add' ? "Thêm nhà cung cấp": operation === 'Update' ? "Sửa thông tin nhà cung cấp" : operation === 'Detail' ? "Xem thôn tin nhà cung cấp" : 'Xóa nhà cung cấp' }
        
        open={operation !== ""}
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
          <Form.Item
                name="id"
              >
              </Form.Item>
           <Form.Item
                label="Tên nhà cung cấp"
                name="name"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên nhà cung cấp",
                  },
                ]}
              >
               <Input readOnly={operation === "Delete"} name="name" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                style={{
                  width: "50%", // Adjust width as needed
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
                <Input readOnly={operation === "Delete"} name="phoneNumber"  maxlength="20" minLength="10"
                  size="20"/>
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                style={{
                  width: "80%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  },
                ]}
              >
                <Input readOnly={operation === "Delete"} name="address" />
              </Form.Item>
          <Form.Item label=" ">
            <div className="submit">
              <Button
                style={{ textAlign: "right" }}
                type="primary"
                htmlType="submit"
              >
                {operation === "Add" ? "Thêm" : null}
                {operation === "Delete" ? "Xóa" : null}
                {operation === "Update" ? "Sửa" : null}
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
      </div>
        </App>
     );
}

export default Manufacturer;