import axios from "axios";
import App from "../App";
import "./type.css";
import { Space, Table, Input, Button, Modal, Form, notification,Pagination,Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import LoadingModal from "../loading/Loading";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';
// import { LoadingModal } from "react-native-loading-modal";

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
      setShowLoading(false);
      setOperation("")
      openNotification('Thành công','Đã thêm vào danh sách');
    },
    onError:(error) => {
      setShowLoading(false);
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
      setShowLoading(false)
      setOperation("")
      openNotification('Thành công','Đã xóa khỏi danh sách')
    },
    onError:(error) => {
      console.log(error.response.data);
      setShowLoading(false)
      openNotification("Thất bại", error.response.data.message);
    }
  });
  //openModal
  const [showLoading,setShowLoading] =useState(false);
  const [operation, setOperation] = useState("");
  //setDataUpdateOrDelete
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
            <Tooltip title="Xóa" color={"blue"}>
          <FontAwesomeIcon className="button-icon" style={{fontSize:"20px"}}  icon={faTrashCan}  onClick={() => {
               handleDelete(record);
              }}/>
           </Tooltip>
        </Space>
      ),
    },
  ];
  const handleDelete = (record) => {
    form.setFieldsValue({
      name: record.name,
      code: record.code,
      id: record.id
    });
    setOperation("Delete")
  };
  const handleAdd = () => {
    form.setFieldsValue({
      name: '',
      code: ''
    })
   setOperation("Add")
  };
  const handleCancel = () => {
      setOperation("")
  };
  const onFinish = (values) => {
    if (operation === "Add") {
      setShowLoading(true);
      mutation.mutate(values);
    }
    if (operation === "Delete") {
      setShowLoading(true);
      deleteType.mutate(values.id);
    
    }

    setOperation(false);
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
  const [confirmLoading,setConfirmLoading]=useState(false)
 

  return (
    <App
    onChose={"type"}
    >
      <div>
      {contextHolder}
        <h2 className="header">Quản lý loại nhân viên</h2>
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
          <Table loading={isLoading} columns={columns} dataSource={data} rowKey="id" pagination={{
            defaultPageSize: 5,
            position: ['bottomCenter']
          }} />
          
        </div>
        <Modal
          title="Loại nhân viên"
          confirmLoading={confirmLoading}
          open={operation !=="" }
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
                  message:"Chưa loại nhân viên"
                },
              ]}
            >
              <Input name="name" readOnly={operation==="Delete"}/>
            </Form.Item>
            {operation==="Delete" ?  <Form.Item style={{display:"none"}}
              name="id"
            >
            </Form.Item> : null}
           
            <Form.Item
              label="Mã loại nhân viên"
              name="code"
              rules={[
                {
                  required: true,
                  message:"Chưa nhập mã loại nhân viên"
                },
              ]}
            >
              <Input name="code" readOnly={operation==="Delete"}/>
            </Form.Item>
            <Form.Item label=" ">
              <div className="submit">
                <Button
                  style={{ textAlign: "right" }}
                  type="primary"
                  htmlType="submit"
                >
                  {operation === "Add" ? "Thêm" : "Xóa"}
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
        <LoadingModal
        showLoading={showLoading}
        />
      </div>
    </App>
  );
}

export default Type;
