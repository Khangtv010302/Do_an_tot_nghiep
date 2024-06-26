import axios, { Axios } from "axios";
import App from "../App";
import "./Staff.css";
import Cookies from "js-cookie";
import LoadingModal from "../loading/Loading";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye,
  faPencil,
  faTrashCan,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { render } from "react-dom";
import Operation from "antd/es/transfer/operation";

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
        .get("http://localhost:8080/API/HealthcareStaff/Search",{
          headers: {
             "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
           
          },
            params: { info:searchInfo },
        })
        .then((res) => {
          setResponse(res.data.data)
          return res.data.data}),
  });
  const searchStaff = useMutation({
    mutationFn: (info) => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/HealthcareStaff/Search",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
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
  //Add Staff
  const addStaff = useMutation({
    mutationFn: (values) => {
      console.log(values);
      return axios({
        method: "post",
        url: "http://localhost:8080/API/HealthcareStaff",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      }).then((response) => response);
    },
    // isLoading: ()=>{
    //   openNotification("DDa", "Đã thêm vào danh sách");
    // }
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStaff"] });
      setShowLoading(false)
      setOperation("")
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      setShowLoading(false)
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
            Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      }).then((response) => response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStaff"] });
      setShowLoading(false)
      setOperation("")
      openNotification("Thành công", "Đã sửa thông tin");
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
      setShowLoading(false)
    },
  });
  const deleteStaff = useMutation({
    mutationFn: (id) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/HealthcareStaff",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
        },
        params:{id}
      }).then((response) => response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStaff"] });
      openNotification("Thành công", "Đã xóa nhân viên");
       setShowLoading(false)
      setOperation("")
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
      setShowLoading(false)
    },
  });
  //Declare variable
  const [searchInfo,setSearchInfo]= useState("");
  const [page, setPage] = React.useState(1);
  const { Search } = Input;
  const [showLoading,setShowLoading]= useState(false);
  const [response, setResponse] = useState([]);
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
            Authorization: `Bearer ${getJwtToken()}`,
      },
    }).then((response) => {
      setListRole(response.data.data);
    });
  };
  
  const columns = [
    {
      title: "#",
      dataIndex: "",
      key: "index",
      render: (_, __, index) => ((page - 1) * 4 + index+1),
    },
    {
      title: "Tên nhân viên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      responsive: ["md"],
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      render: (sex) => (sex === true ? "Nam" : "Nữ"),
    },
    {
      responsive: ["md"],
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      responsive: ["md"],
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
          <Tooltip title="Xem chi tiết" color={"blue"}>
          <FontAwesomeIcon className="button-icon" style={{fontSize:"20px"}}  icon={faEye}  onClick={() => {
                handleDetail(record);
              }}/>
          </Tooltip>
          <Tooltip title="Sửa" color={"blue"}>
          <FontAwesomeIcon className="button-icon" style={{fontSize:"20px"}}  icon={faPencil}  onClick={() => {
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
  useEffect(() => {
    getListRole()
  }, []);
  const handleAdd = () => {
    form.resetFields();
   
    setOperation("Add");
  };
  const handleCancel = () => {
    setOperation("");
  };
  //function
  
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") !== null)
      return sessionStorage.getItem("jwtToken");
    if (Cookies.get("jwtToken") !== undefined) return Cookies.get("jwtToken");
  };
  //Onfinish
  function onFinish(values) {
    if (operation === "Add") {
      setShowLoading(true)
      addStaff.mutate(values);
    }
    if (operation === "Update") {
      setShowLoading(true)
      updateStaff.mutate(values);
    }
    if (operation === "Delete") {
      setShowLoading(true)
      console.log(dataById.id);
      deleteStaff.mutate(dataById.id);
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
    openNotification("Thất bại", "Không thể thao tác");
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
    <App
    onChose={"staff"}
    >
      {contextHolder}
      <h2 className="header">Quản lý nhân viên</h2>
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
                placeholder="Nhập tên nhân viên hoặc email hoặc username"
                onSearch={(value, _e, info) => {
                  console.log(info?.source, value);
                  setShowLoading(true);
                  setSearchInfo(value);
                  searchStaff.mutate(value);
                  setOperation("");
                }}
                style={{
                  width: "60%",
                }}
              /></Col>
        </Row>
        <Row>
          <Col span={24}><Table
               style={{ margin: "1%", border: "1px solid",  borderColor:"#A9A9A9",  }}
          loading={isLoading}
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
        /></Col>
        </Row>
        
      </div>
      {operation === "Add" || operation === "Update" ? <Modal
        closeIcon={null}
        title={<div style={ {fontSize: "24px",
        color: "orange",
        backgroundColor: "darkblue",
        fontWeight: "bold",
        borderRadius: "8px",
        paddingLeft: "10px",     
        }
       }
        >{
          operation === "Add"
          ? "Thêm nhân viên"
          : operation === "Update"
          ? "Sửa thông tin nhân viên"
          : null
    }
        </div>} 
     
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
          // colon={false}
          style={{
            maxWidth: 800,
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
               <Input readOnly={operation !== "Add" && operation !== "Update"}    name="fullname" />
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
                  {
                    type: 'email',
                    message: 'Email kkhông đúng định dạng',
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
          <Form.Item label="">
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
                style={{ textAlign: "right", marginLeft: "10px" , color: "#4d79ff",
                fontWeight: "500",
                backgroundColor: "#f2f2f2",}}
                type="primary"
                onClick={handleCancel}
              >
                Quay lại
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal> : null}
      
      <Modal
        closeIcon={null}
        open={operation === "Delete" || operation === "Detail"}
        onCancel={handleCancel}
        footer={null}
        width={600}
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
          
          <div >
            <h2 style={{textAlign:"center",marginBottom:"2%",fontSize: "24px",
        color: "orange",
        backgroundColor: "darkblue",
        fontWeight: "bold",
        borderRadius: "8px",
        paddingLeft: "10px",     }}>{
          operation === "Detail"
            ? "Thông tin nhân viên"
            : operation === "Delete"
            ? "Xóa nhân viên"
            : null
        }</h2>
        <diV>
          <Row className="employee-info">
            <Col span={12}>  <p><label>Tên nhân viên:</label> {dataById.fullname}</p></Col>
            <Col span={12}> <p><label>Giới tính:</label> {dataById.sex}</p></Col>
            <Col span={12}>     <p><label>Email:</label> {dataById.email}</p></Col>
            <Col span={12}>   <p><label>Số điện thoại:</label> {dataById.phoneNumber}</p></Col>
            <Col span={12}>  <p><label>Username:</label> {dataById.username}</p> </Col>
            <Col span={12}>   <p><label>Vai trò:</label> {dataById.role}</p></Col>
            <Col span={12}>  <p><label>Địa chỉ:</label> {dataById.address}</p></Col>

          </Row> 
          <Row>
            <Col
            span={12}
            style={{ color: "#ff0f0f", fontSize: "17px", fontWeight: "bold" }}
          >
           {operation === "Delete" ? "Bạn có muốn xóa nhân viên này !" : null} 
          </Col>
              <Col span={12}> <div className="submit" >
               {operation === "Detail" ? null : 
              <Button
              style={{ textAlign: "right" }}
              type="primary"
              htmlType="submit"
             >
            
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
            </div></Col>
            </Row>
         
        </diV>
          
        </div>
          
          <Form.Item name="id"style={{display:"none"}}></Form.Item>
        
        </Form>
      </Modal>
      <LoadingModal
        showLoading={showLoading}
        />
    </App>
  );
}

export default Staff;
