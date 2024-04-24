import axios from "axios";
import App from "../App";
import "./type.css";
import { Space, Table, Input, Button, Modal, Form, notification,Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function Type() {
  //Querry
  const queryClient = useQueryClient();
  //response
  const [response, setResponse] = useState();
 

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoType"],
    queryFn: () =>
      axios.get("http://localhost:8080/API/Role").then((res) => res.data.data),
  });
  const mutation = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Role",
        headers: {
          "Content-type": "application/json",
        },
        data: values,
      }).then((response) => setResponse(response)) ;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoType"] });
      openNotification('Thành công','Đã thêm vào danh sách');
    },
    onError:(error) => {
      openNotification("Thất bại", error.response.data.message);
    }
  });
  const deleteType = useMutation({
    mutationFn: (id) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/Role",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          id,
        },
      }).then((response) => setResponse(response.data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoType"] });
    },
    onError:(error) => {
      openNotification("Thất bại", error.response.data.message);
    }
  });
  //openModal
  const [isModalOpen, setIsModalOpen] = useState({
    Add: false,
    Delete: false,
  });
  //setDataUpdateOrDelete
  const [dataById, setDataById] = useState({
    name: "",
    code: "",
    id: "",
  });
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Loại nhân viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setIsModalOpen({ ...isModalOpen, Delete: true });
              handleDelete(record);
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  const handleDelete = (record) => {
    setDataById({
      name: record.name,
      code: record.code,
      id: record.id,
    });
    console.log(record);
  };
  const showModal = () => {
    setIsModalOpen({ ...isModalOpen, Add: true });
  };
  const handleCancel = () => {
    setIsModalOpen({ Add: false, Delete: false });
  };
  useEffect(() => {
    form.setFieldsValue({
      name: dataById.name,
      code: dataById.code,
    });
    if(isModalOpen.Add===true){
      form.setFieldsValue({
        name: '',
        code: ''
      })
    }
  }, [form, dataById, isModalOpen.Add]);
  const onFinish = (values) => {
    if (isModalOpen.Add === true) {
      mutation.mutate(values);
    }
    if (isModalOpen.Delete === true) {
      const id = dataById.id;
      deleteType.mutate(id);
      openNotification('Thành công','Đã xóa khỏi danh sách')
    }

    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state,description) => {
    api.info({
      message: `${state}`,
      description: description
    });
  }
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // số lượng hàng trên mỗi trang

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return (
    <App>
      <div>
      {contextHolder}
        <h2 className="header">Quản lý loại nhân viên</h2>
        <div className="center">
          <Button
            type="primary"
            onClick={showModal}
            style={{
              marginBottom: "1%",
              textAlign: "left",
            }}
          >
            Thêm
          </Button>
          <Table columns={columns} dataSource={data} rowKey="id" pagination={{
            defaultPageSize: 5,
            position: ['bottomCenter']
          }} />
          
        </div>
        <Modal
          title="Loại nhân viên"
          open={!!(isModalOpen.Add || isModalOpen.Delete)}
          onCancel={handleCancel}
          footer={null}
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
              maxWidth: 600,
            }}
            form={form}
          >
            <Form.Item
              label="Loại nhân viên"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="name" readOnly={isModalOpen.Delete}/>
            </Form.Item>
            <Form.Item
              label="Mã loại nhân viên"
              name="code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="code" readOnly={isModalOpen.Delete}/>
            </Form.Item>
            <Form.Item label=" ">
              <div className="submit">
                <Button
                  style={{ textAlign: "right" }}
                  type="primary"
                  htmlType="submit"
                >
                  {isModalOpen.Add === true ? "Thêm" : "Xóa"}
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

export default Type;
