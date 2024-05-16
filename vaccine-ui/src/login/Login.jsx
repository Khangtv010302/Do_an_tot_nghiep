import * as React from "react";
import axios, { Axios } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import CssBaseline from "@mui/material/CssBaseline";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Cookies from "js-cookie";
import "./Login.css";
import { notification, Row, Col, Input, Modal } from "antd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingModal from "../loading/Loading";
import Operation from "antd/es/transfer/operation";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {""}
      <span color="inherit" href="https://mui.com/">
        Điện thoại hỗ trợ: 0258 3834 009
      </span>{" "}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Login() {
  //alert
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  //Declare variable
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  const [isRemember, setIsRemember] = useState(false);
  const [isLogin,setIsLogin]= useState(false);
  const [response, setResponse] = useState([]);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  
  const [showLoading, setShowLoading] = useState(false);
  const [operation, setOperation] = useState("");
  
  useLayoutEffect(() => {
    if (sessionStorage.length > 0 ||  Object.keys(Cookies.get()).length  > 0){
        setIsLogin(true);
      }
    else setIsLogin(false);
  }, []);

  //tanStackQuerry
  const queryClient = useQueryClient();
  const loginWithUsernamePassword = useMutation({
    mutationFn: (login) => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/Auth/Login",
        headers: {
          "Content-type": "application/json",
        },
        params: login,
      }).then((response) => {
        handleStoreData(response.data.data);
        setResponse(response.data.data);
      });
    },
    onSuccess: () => {
      setShowLoading(false);
      openNotification("Thành công", "Bạn đã đăng nhập");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const sendVerifyCode = useMutation({
    mutationFn: (email) => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/Auth/SendEmailCode",
        headers: {
          "Content-type": "application/json",
        },
        params: {email},
      }).then((response) => {
        setResponse(response.data.data);
      });
    },
    onSuccess: () => {
      setOperation("EnterCode");
      setShowLoading(false);
      openNotification("Thành công", "Mã xác thực đã gửi tới email của bạn");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const verifyCode = useMutation({
    mutationFn: (verificationCode) => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/Auth/VerifyCode",
        headers: {
          "Content-type": "application/json",
        },
        params: verificationCode,
      }).then((response) => {
        setResponse(response.data.data);
      });
    },
    onSuccess: () => {
      setOperation("EnterPassword");
      setShowLoading(false);
      openNotification("Thành công", "Xác thực thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      console.log(error.response.data.message)
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const updatePassword = useMutation({
    mutationFn: (UpdateForgotPasswordRequest) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/Auth/UpdatePassword",
        headers: {
          "Content-type": "application/json",
        },
        data: UpdateForgotPasswordRequest,
      }).then((response) => {
        setResponse(response.data.data);
      });
    },
    onSuccess: () => {
      setOperation("");
      setShowLoading(false);
      openNotification("Thành công", "Đổi mật khẩu thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      console.log(error.response.data.message)
      openNotification("Thất bại", error.response.data.message);
    },
  })
  //function
  function validatePassword(password) {
    const regex = /^(?=.*[A-Z])[A-Za-z0-9]*$/;
    return regex.test(password);
  }
  const handleClickShowPasswordModal = () => {
    setShowPasswordModal((show) => !show)
  };
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  };
  const handleNewPassword = (event) => {
   
    setPassword(event.target.value);
  };

  const handleReNewPassword = (event) => {
    setRePassword(event.target.value);
  };
  const onChange = (text) => {
    console.log('onChange:', text.toLowerCase());
    setCode(text.toLowerCase())
  };
  const sharedProps = {
    onChange,
  };
  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };
  const handleForgotPassword = () => {
    setEmail("");
    setShowPasswordModal(false);
    setPassword("");
    setRePassword("");
    setOperation("EnterEmail");
  };
  const handleCancle = () => {
    setShowPasswordModal(false);

    setOperation("");
  };
  const handleResetPassword = () => {
    if(operation ==="EnterEmail"){
      setShowLoading(true);
      sendVerifyCode.mutate(email)
    }
    if(operation ==="EnterCode"){
      const verificationCode ={
        code:code,
        email:email
      }
      setShowLoading(true);
      verifyCode.mutate(verificationCode)
    }
    console.log(operation)
    if(operation ==="EnterPassword"){
      const UpdateForgotPasswordRequest={
        email:email,
        code:code,
        password:password
      }
      console.log(password)
      console.log(email)
      console.log(code)
      setShowLoading(true);
      updatePassword.mutate(UpdateForgotPasswordRequest)
    }
  };
  const handleStoreData = (data) => {
    console.log(data);
    if (isRemember === false) {
      console.log(isRemember);
      console.log(data.expiredDate);
      sessionStorage.setItem("expiredDate", data.expiredDate);
      sessionStorage.setItem("jwtToken", data.jwtToken);
      sessionStorage.setItem("refreshToken", data.refreshToken);
      sessionStorage.setItem("roleCode", data.roleCode);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("expiredDateRefresh",data.expiredDateRefresh)
    } else {
      Cookies.set("jwtToken", data.jwtToken, {
        expires: new Date(data.expiredDate),
      });

      Cookies.set("expiredDate", data.expiredDate);
      Cookies.set("expiredDateRefresh", data.expiredDateRefresh);
      Cookies.set("refreshToken", data.refreshToken, {
        expires: new Date(data.expiredDateRefresh),
      });
      
      Cookies.set("roleCode", data.roleCode, {
        expires: new Date(data.expiredDateRefresh),
      });
      Cookies.set("username", data.username, {
        expires: new Date(data.expiredDateRefresh),
      });
    }
    navigate("/DashBoard", { replace: true });
  };
  const handleRemember = (e) => {
    console.log(e.target.checked);
    setIsRemember(e.target.checked);
  };
  const handleSubmit = (event) => {
    setShowLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginWithUsernamePassword.mutate({
      username: data.get("username"),
      password: data.get("password"),
    });
  };
  return (
    isLogin === true ? <Navigate to="/DashBoard" replace></Navigate> :
    <ThemeProvider theme={defaultTheme}>
       {contextHolder}
       <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
         <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://tiemchung.vncdc.gov.vn/Content/v2/images/bg-new.jpg)",
            backgroundRepeat: " -repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Row style={{ width: "60%" }}>
              <Col span={4}>
                {" "}
                <img
                  className="operation"
                  src="/public/assets/ytdp_logo.png"
                  style={{ width: "100%" }}
                  alt="logo"
                />
              </Col>

              <Col
                span={20}
                style={{
                  fontFamily: "Roboto', sans-serif !important",
                  color: "#428bca",
                  fontWeight: "bold",
                }}
              >
                {" "}
                <div style={{ paddingTop: "4%", textAlign: "center" }}>
                  HỆ THỐNG TIÊM CHỦNG CHO TRẺ TẠI PHƯỜNG
                </div>
              </Col>
            </Row>

            <Typography
              style={{
                marginBottom: "20%",
              }}
            ></Typography>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type=   {!showPassword ? "password" : "text"}
                InputProps={{
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        onChange={handleRemember}
                      />
                    }
                    label="Nhớ tài khoản"
                  />
                </Grid>
                <Grid
                  item
                  xs
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Link  variant="body2" onClick={handleForgotPassword} style={{
                    cursor:"pointer"
                  }}>
                    Quên mật khẩu?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <LoadingModal showLoading={showLoading} />
      <Modal
        open={operation !== ""}
        footer={false}
        title={
          <div
            style={{
              fontSize: "30px",
              color: "#00004d",
              fontWeight: "500",
              fontFamily: "Lucida Console Monaco",
            }}
          >
            {operation === "EnterEmail"
              ? "Quên mật khẩu"
              : operation === "EnterCode"
              ? "Nhập mã xác nhận"
              : "Đặt lại mật khẩu mới"}
          </div>
        }
        onCancel={handleCancle}
      >
        {operation === "EnterEmail" ? (
          <p
            style={{
              fontSize: "14px",
              color: "#00004d",
              fontWeight: "400",
              marginBottom: "5%",
            }}
          >
            Vui lòng hãy nhập địa chỉ email nếu bạn muốn nhận mã để đặt lại mật
            khẩu của mình
          </p>
        ) : operation === "EnterCode" ? (
          <p
            style={{
              fontSize: "14px",
              color: "#00004d",
              fontWeight: "400",
              marginBottom: "5%",
            }}
          >
            Vui lòng hãy nhập mã xác nhận để đặt lại mật
            khẩu của mình
          </p>
        ) : (
          <p
            style={{
              fontSize: "14px",
              color: "#00004d",
              fontWeight: "400",
              marginBottom: "5%",
            }}
          >
            Vui lòng hãy nhập mật khẩu mới
          </p>
        )}
        {operation ==="EnterEmail"?  <TextField
          value={email}
          id="email"
          label="Email"
          variant="outlined"
          size="small"
          error={emailError}
          helperText={emailError ? "Email không đúng định dạng" : ""}
          onChange={handleEmailChange}
          style={{
            width: "100%",
            color: "#00004d",
          }}
        /> : operation==="EnterCode"? <div style={{textAlign:"center"}}>
          <Input.OTP {...sharedProps} length={5} size="large"   style={{
          
          }}/>
          </div>:<div>
          <TextField
          value={password}
          id="password"
          label="Mật khẩu"
          variant="outlined"
          error={!validatePassword(password)}
          helperText={!validatePassword(password) ?"Mật khẩu phải bắt đầu bằng ký tự in hoa và phải có ký tự số" :""}
          size="small"
          type=   {showPasswordModal ? "text" : "password"}
          InputProps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordModal}
                  edge="end"
                >
                  {showPasswordModal ? <VisibilityOff /> : <Visibility />}
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
          value={rePassword}
          id="rePassword"
          label="Nhập lại mật khẩu"
          error={password !== rePassword}
          helperText={password !== rePassword ? "Mật khẩu nhập lại không trùng khớp" : ""}
          variant="outlined"
          size="small"
          type=   {showPasswordModal ? "text" : "password"}
          onChange={handleReNewPassword}
          style={{
            width: "100%",
            color: "#00004d",
          }}
        /></div>}
       

        <Row>
          <Col
            span={24}
            style={{
              textAlign: "center",
              margin: "20px 0",
              backgroundColor: "#000066",
              borderRadius: "5px",
              height: "50px",
              padding: "7px 0",
            }}
          >
            <Button
              type="primary"
              onClick={handleResetPassword}
              style={{
                color: "white",
                fontWeight: "400",
                fontSize: "16px",
                textTransform: "none",
              }}
              disabled={emailError || email == "" || password !== rePassword}
            >
              {operation ==="EnterEmail"? "Yêu cầu gửi mã xác thực" : operation ==="EnterCode" ? "Xác nhận":"Đổi mật khẩu"}
            </Button>
          </Col>
          <Col
            span={24}
            style={{
              textAlign: "center",
            }}
          >
            {" "}
            <Button
              key="back"
              onClick={handleCancle}
              style={{
                color: "#000033",
                fontWeight: "600",
                fontSize: "14px",
                textTransform: "none",
              }}
            >
              Quay lại
            </Button>
          </Col>
        </Row>
      </Modal>
      <LoadingModal showLoading={showLoading}></LoadingModal>
    </ThemeProvider>
  );
}

export default Login;
