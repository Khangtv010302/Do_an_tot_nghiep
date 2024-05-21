import App from "../App";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import Cookies from "js-cookie";
import {
  Space,
  Table,
  Input,
  Button,
  Row,
  Col,
  Modal,
  
  Form,
  notification,
  Tooltip,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPencil,
  faTrashCan,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingModal from "../loading/Loading";
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
   const [searchInfo,setSearchInfo]= useState("");
  const [page, setPage] = React.useState(1);
  const [operation, setOperation] = useState("");
  const [response, setResponse] = useState([]);
  const { Search } = Input;
  const [showLoading, setShowLoading] = useState(false);
  const [form] = Form.useForm();
  //tanstackquerry
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching, isSuccess } = useQuery({
    queryKey: ["repoManufacturer"],
    queryFn: () =>
      {
        return axios({
          method: "get",
          url: "http://localhost:8080/API/Manufacturer",
          headers: {
            "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
       
          },
          params: { name:searchInfo },
        }).then((response) => {
          console.log(response.data.data);
          setResponse(response.data.data);
        });
      }
  });

  const searchManufacturer = useMutation({
    mutationFn: (name) => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/Manufacturer",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: { name },
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
  const addManufacturer = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Manufacturer",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      }).then((response) =>response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoManufacturer"] });
      setShowLoading(false);
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      setShowLoading(false);
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
          Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      }).then((response) => response);
    },
    onSuccess: () => {
      setShowLoading(false);
      queryClient.invalidateQueries({ queryKey: ["repoManufacturer"] });
      openNotification("Thành công", "Chỉnh sửa thành công");
    },
    onError: (error) => {
      setShowLoading(false);
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
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: {
          id,
        },
      }).then((response) => response.data);
    },
    onSuccess: () => {
      setShowLoading(false);
      queryClient.invalidateQueries({ queryKey: ["repoManufacturer"] });
      openNotification("Thành công", "Xóa thành công");
    },
    onError:(error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    }
  });
  //columns
  const columns =[
    {
      title: "#",
      dataIndex: "",
      width: '1%',
      key: "index",
      render: (_, __, index) => (<span style={{fontSize:"12px"}}>{(page - 1) * 4 + index+1}</span>),
      
    },
    {
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
          <Tooltip title="Sửa" color={"blue"}>
          <FontAwesomeIcon className="button-icon" style={{fontSize:"20px"}} icon={faPencil}   onClick={() => {
                 handleUpdate(record);
              }}/>
           
          </Tooltip>
          <Tooltip title="Xóa" color={"blue"}>
          <FontAwesomeIcon className="button-icon" style={{fontSize:"20px"}}  icon={faTrashCan}  onClick={() => {
               handleDelete(record);
              }}/>
          </Tooltip>
      </Space>
    ),
  },
];
//useEffect

//function
const getJwtToken = () => {
 if (sessionStorage.getItem("jwtToken") !== null)
    return sessionStorage.getItem("jwtToken");
  if (Cookies.get("jwtToken") !== undefined) return Cookies.get("jwtToken");
};
const handleCancel = () => {
  setOperation("");
};
const handleAdd = () => {
   setOperation("Add");
   form.resetFields();
 };
function onFinish(values) {
  if (operation === "Add") {
    setShowLoading(true);
    const manufacturer = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address,
    };
    addManufacturer.mutate(manufacturer);
  }
  if (operation === "Update") {
    setShowLoading(true);
    const manufacturer = {
      name: values.name,
      phoneNumber: values.phoneNumber,
      address: values.address,
      id:values.id
    };
    updateManufacturer.mutate(manufacturer)
  }
  if (operation === "Delete") {
    setShowLoading(true);
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
        <App
        onChose={"Manufacturer"}
        >
             {contextHolder}
            <h2 className="header">Quản lý nhà cung cấp</h2>
      <div className="center">
      <Row style={{marginLeft:"1%",
        width:"98%"
      }}>
          <Col span={12}><Button
          type="primary"
          onClick={handleAdd}
          style={{
            marginBottom: "1%",
            textAlign: "left",
          }}
        >
           <FontAwesomeIcon className="button-icon"  icon={faPlus} style={{marginRight:"5%",color:"white"}}/>
          Thêm
        </Button></Col>
          <Col span={12} style={{textAlign:"right"}}> <Search
                allowClear={true}
                placeholder="Nhập tên nhà cung cấp"
                onSearch={(value, _e, info) => {
                  console.log(info?.source, value);
                  setShowLoading(true);
                  setSearchInfo(value);
                  searchManufacturer.mutate(value);
                  setOperation("");
                }}
                style={{
                  width: "90%",
                }}
              /></Col>
        </Row>
        
       
        <Table
             style={{ margin: "1%", border: "1px solid",  borderColor:"#A9A9A9",  }}
          columns={columns}
          dataSource={response}
          rowKey="id"
          pagination={{
            defaultPageSize: 4,
            position: ["bottomCenter"],
            onChange(current) {
              setPage(current);
            }
          }}
        />
         <Modal
         closeIcon={null}
         title={<div style={ {fontSize: "24px",
         color: "orange",
         backgroundColor: "darkblue",
         fontWeight: "bold",
         borderRadius: "8px",
         paddingLeft: "10px",     
         }
        }
         >
          {operation==='Add' ? "Thêm nhà cung cấp": operation === 'Update' ? "Sửa thông tin nhà cung cấp" : operation === 'Detail' ? "Xem thôn tin nhà cung cấp" : 'Xóa nhà cung cấp' }
         </div>}
       
        
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
                name="id" style={{display:"none"}}>
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
          <Form.Item label="">
            <Row>
            <Col
            span={12}
            style={{ color: "#ff0f0f", fontSize: "20px", fontWeight: "bold" }}
          >
           {operation === "Delete" ? "Bạn có muốn xóa nhà cung cấp này !" : null} 
          </Col>
              <Col span={12}> <div className="submit" >
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
                style={{ textAlign: "right", marginLeft: "10px", color: "#4d79ff",
                fontWeight: "500",
                backgroundColor: "#f2f2f2", }}
               
                type="primary"
                onClick={handleCancel}
              >
                Quay lại
              </Button>
            </div></Col>
            </Row>
         
           
          </Form.Item>
        </Form>
      </Modal>
      <LoadingModal
      showLoading={showLoading}
      ></LoadingModal>
      </div>
        </App>
     );
}

export default Manufacturer;