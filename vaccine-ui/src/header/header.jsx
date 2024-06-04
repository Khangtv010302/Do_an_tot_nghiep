import { Row, Col, Space, Dropdown,Modal,Button,notification,Radio,Form,Select,Input } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMutation } from "@tanstack/react-query";
import {
  faUserCircle,
  faKey,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useEffect, useState} from "react";
import "./Header.css";
import Cookies from "js-cookie";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import LoadingModal from "../loading/Loading";
function HeaderPage() {
   //alert
   const [api, contextHolder] = notification.useNotification();
   const openNotification = (state, description) => {
     api.info({
       message: `${state}`,
       description: description,
     });
   };
  //declare variable
  const [dataById,setDataById]= useState();
  const [form] = Form.useForm();
  const [listRole,setListRole] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [showOldPasswordModal, setShowOldPasswordModal] = useState(false);
  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [reNewPassword,setReNewPassword] = useState("");
  const [operation, setOperation] = useState("");
  const [fullname,setFullname]=useState("");
  const items = [
    {
      key: "Account",
      label: "Tài khoản",
      icon: <FontAwesomeIcon icon={faUserCircle} />,
      href: "#",
    },
    {
      key: "ChangePassword",
      label: "Đổi mật khẩu", // Updated label
      icon: <FontAwesomeIcon icon={faKey} />,
      href: "#",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <FontAwesomeIcon icon={faSignOutAlt} />,
      href: "#",
    },
  ];
  //tanstack
  const logout = useMutation({
    mutationFn: () => {
      const refreshToken= getRefreshToken();
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Account/Logout",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: {
          refreshToken
        },
      }).then((response) => {
       return response;
      });
    },
    onSuccess: () => {
      setShowLoading(false);
      openNotification("Thành công", "Bạn đã đăng xuất");
      sessionStorage.clear();
      const cookieKeys = Object.keys(Cookies.get());
      // Iterate over each key and remove the corresponding cookie
      cookieKeys.forEach((key) => {
        Cookies.remove(key);
      });
      navigate("/Login", { replace: true });
    },
    onError: (error) => {
      setShowLoading(false);
      console.log(error.response.data.message)
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const changePassword = useMutation({
    mutationFn: () => {
      const username= getUsername();
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Account/ChangePassword",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: {
          username,
          oldPassword,
          newPassword
        },
      }).then((response) => {
       return response;
      });
    },
    onSuccess: () => {
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Bạn đã đổi mật khẩu");
    },
    onError: (error) => {
      setShowLoading(false);
      console.log(error.response.data.message)
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const selectByUsername = useMutation({
    mutationFn: () => {
      const username= getUsername();
      return axios({
        method: "get",
        url: "http://localhost:8080/API/Account/SelectByUsername",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: {
          username,
        },
      }).then((response) => {
        console.log(response.data.data)
        setDataById(response.data.data)
        form.setFieldsValue({
          fullname:  response.data.data.fullname,
          sex: response.data.data.sex,
          email:  response.data.data.email,
          phoneNumber:  response.data.data.phoneNumber,
          placeOfResidence:  response.data.data.placeOfResidence,
          roleId:  response.data.data.roleId,
          id:  response.data.data.id,
          username:  response.data.data.username,
        });
       return response.data.data;
      });
    },
    onSuccess: () => {
      setShowLoading(false);
    },
    onError: (error) => {
      setShowLoading(false);
      console.log(error.response.data.message)
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const updateStaff = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "Post",
        url: "http://localhost:8080/API/Account/UpdateAccount",
        headers: {
           "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      }).then((response) => response);
    },
    onSuccess: () => {
      setShowLoading(false)
      setOperation("Account")
      openNotification("Thành công", "Cập nhật thông tin thành công");
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
      setShowLoading(false)
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    getFullnameByUsername(getUsername())
    getListRole()
  }, []);
  //function
  const handleUpdate = () =>{
    setOperation("Update");
  }
  const getListRole = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/General/Role",
      headers: {
         "Content-type": "application/json",
            Authorization: `Bearer ${getJwtToken()}`,
      },
    }).then((response) => {
      setListRole(response.data.data);
    });
  };
  function onFinish(values) {
    console.log(values);
    if (operation === "Update") {
      setShowLoading(true)
      updateStaff.mutate(values);
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
    openNotification("Thất bại", "Không thể thao tác");
  };
  const handleChangePassword = ()=>{
    setShowLoading(true);
    changePassword.mutate();
  }
  const handleNewPassword = (event) => {
   
    setNewPassword(event.target.value);
  };
  const handleOldPassword = (event) => {
   
    setOldPassword(event.target.value);
  };
  const handleReNewPassword = (event) => {
    setReNewPassword(event.target.value);
  };
  const handleClickShowOldPasswordModal = () => {
    setShowOldPasswordModal((show) => !show)
  };
  const handleClickShowNewPasswordModal = () => {
    setShowNewPasswordModal((show) => !show)
  };
  function validatePassword(password) {
    const regex = /^(?=.*[A-Z])[A-Za-z0-9]*$/;
    if(password ==="")
      return true;
    return regex.test(password);
  }
  const handleCancel = () => {
    setShowNewPasswordModal(false)
    setShowOldPasswordModal(false)
    if(operation !=="Update")
      setOperation("");
    else {setOperation("Account")
    form.setFieldsValue({
      fullname:  dataById.fullname,
      sex: dataById.sex,
      email:  dataById.email,
      phoneNumber:  dataById.phoneNumber,
      placeOfResidence:  dataById.placeOfResidence,
      roleId:  dataById.roleId,
      id:  dataById.id,
      username:  dataById.username,
    });
    }
  };
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") != null){
    
      return sessionStorage.getItem("jwtToken");
    }
    if (Cookies.get("jwtToken") != undefined) {
      return Cookies.get("jwtToken");
    }
  };
  const getRefreshToken = () => {
    if (sessionStorage.getItem("refreshToken") !== null)
      return sessionStorage.getItem("refreshToken");
    if (Cookies.get("refreshToken") !== undefined) return Cookies.get("refreshToken");
  };
  const getUsername = () => {
    if (sessionStorage.getItem("username") !== null)
      return sessionStorage.getItem("username");
    if (Cookies.get("username") !== undefined) return Cookies.get("username");
  };
  const getFullnameByUsername = (username) => {
   
    axios({
      method: "get",
      url: "http://localhost:8080/API/Account/getNameByUsername",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
      params:{username}
    }).then((response) => {
      // console.log(response.data.message);
      setFullname(response.data.message);
    });
  };
  const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
    if (key === "logout") {
      logout.mutate();
     
    }
    if (key ==="ChangePassword"){
      setOldPassword("");
      setNewPassword("");
      setReNewPassword(""); 
      setOperation("ChangePassword")
    }
    if (key ==="Account"){
      selectByUsername.mutate()
      setOperation("Account")
    }
  };
  return (
    <Row>
      {contextHolder}
      <Col span={24}>
        <div
          style={{
            textAlign: "right",
            backgroundColor: "#001529",
            paddingRight: "1%",
          }}
        >
          <Space>
            <Dropdown
              onClick={(e) => e.preventDefault()}
              menu={{
                items,
                onClick,
              }}
              placement="bottom"
              arrow
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <span style={{ padding: "3px", marginRight: "3px" }}>
                  {fullname}
                </span>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ fontSize: "30px", marginRight: "5px" }}
                />
              </div>
            </Dropdown>
          </Space>
        </div>
      </Col>
      {operation ==="ChangePassword"? ( <Modal
        open={operation !== ""}
        footer={false}
        title={
          <div
            style={{
              fontSize: "25px",
              color: "#00004d",
              fontWeight: "500",
              fontFamily: "Lucida Console Monaco",
            }}
          >
            Đổi mật khẩu
          </div>
        }
        onCancel={handleCancel}
      >
        <TextField
          value={oldPassword}
          id="password"
          label="Nhập mật khẩu cũ"
          variant="outlined"
          size="small"
          type=   {showOldPasswordModal ? "text" : "password"}
          InputProps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowOldPasswordModal}
                  edge="end"
                >
                  {showOldPasswordModal ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          onChange={handleOldPassword}
          style={{
            width: "100%",
            color: "#00004d",
            marginBottom:"20px"
          }}
        />
          <TextField
          value={newPassword}
          id="password"
          label="Nhập mật khẩu mới"
          variant="outlined"
          error={!validatePassword(newPassword)}
          helperText={!validatePassword(newPassword) ?"Mật khẩu phải bắt đầu bằng ký tự in hoa và phải có ký tự số" :""}
          size="small"
          type=   {showNewPasswordModal ? "text" : "password"}
          InputProps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPasswordModal}
                  edge="end"
                >
                  {showNewPasswordModal ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          onChange={handleNewPassword}
          style={{
            width: "100%",
            color: "#00004d",
            marginBottom:"20px"
          }}
        />
         <TextField
          value={reNewPassword}
          id="rePassword"
          label="Nhập lại mật khẩu mới"
          error={newPassword !== reNewPassword && reNewPassword !==""}
          helperText={newPassword === reNewPassword && reNewPassword ==="" ? null : "Mật khẩu nhập lại không trùng khớp"}
          variant="outlined"
          size="small"
          type=   {showNewPasswordModal ? "text" : "password"}
          onChange={handleReNewPassword}
          style={{
            width: "100%",
            color: "#00004d",
          }}
        />
        <div style={{marginTop:"2%",textAlign:"right"}}>
                {operation !== "ChangePassword" ? null : (
                  <Button
                    style={{ textAlign: "right" }}
                    type="primary"
                    onClick={handleChangePassword}
                    disabled={oldPassword === "" || newPassword !== reNewPassword || reNewPassword ===""}
                  >
                    Đổi mật khẩu
                  </Button>
                )}

                <Button
                  style={{
                    textAlign: "right",
                    marginLeft: "10px",
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
      </Modal>):null}

      {operation === "Account" || operation === "Update" ? <Modal
       title={<div style={ {fontSize: "24px",
       color: "orange",
       backgroundColor: "darkblue",
       fontWeight: "bold",
       borderRadius: "8px",
       paddingLeft: "10px",
      
     }
   }
       >{ operation === "Account"
       ? "Thông tin cá nhân"
       : operation === "Update"
       ? "Chỉnh sửa thông tin các nhân"
       : null}
       </div>
       }
        
        open={operation !== ""}
        onCancel={handleCancel}
        footer={null}
        width="50%"
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
            maxWidth: "100%",
          }}
          form={form}
        >
           <Form.Item name="id" style={{display:"none"}}></Form.Item> 
           <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Họ và tên:"
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
               <Input readOnly={ operation !== "Update"}    name="fullname" />
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
                <Radio.Group style={{ marginLeft: "-40px", pointerEvents: operation !== "Update" ? "none" : null }}  >
                  <Radio value={true} >Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
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
               <Input readOnly={ operation !== "Update"}   name="email" type="email" size="30" />
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
               <Input readOnly={ operation !== "Update"}  
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
               <Input readOnly={ operation !== ""} 
            
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
                <Select style={{ marginLeft: "-40px", pointerEvents: operation !== "" ? "none" : null }}  >
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
           <Input readOnly={ operation !== "Update"}  name="placeOfResidence" maxLength="30" size="30" />
          </Form.Item>
          <Row>
            <Col span={12}> 
            {operation !== "Update" ? <Button
              style={{ textAlign: "right", backgroundColor:"blue" }}
              type="primary"
              onClick={handleUpdate}
             >
            
              Chỉnh sửa thông tin
             
            </Button> :null }
            </Col>
            <Col span={12}> <div className="submit">
              {operation === "Account" ? null : 
              <Button
              style={{ textAlign: "right" }}
              type="primary"
              htmlType="submit"
             >
            
              {operation === "Update" ? "Sửa" : null}
             
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
            </div></Col>
          </Row>
          
       
           
        </Form>
      </Modal> : null}
      <LoadingModal showLoading={showLoading}></LoadingModal>
    </Row>
  );
}

export default HeaderPage;
