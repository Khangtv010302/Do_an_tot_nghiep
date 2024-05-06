import * as React from "react";
import axios, { Axios } from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import {
  notification,
  Row,
  Col,
} from "antd";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingModal from "../loading/Loading";

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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
    loginWithUsernamePassword.mutate({
      username: data.get("username"),
      password: data.get("password"),
    })
   
  };
  //alert
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
 //Declare variable
 const [response, setResponse] = useState([]);
 const [showLoading, setShowLoading] = useState(false);
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
      console.log(response.data.data)
      setResponse(response.data.data)
    });
  },
  onSuccess: () => {
    setShowLoading(false);
    openNotification("Thành công","Bạn đã đăng nhập")
  },
  onError: (error) => {
    setShowLoading(false);
    openNotification("Thất bại", error.response.data.message);
  },
});
  return (
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
            <Row style={{width:"60%"}} >
                <Col span={4}> <img
                  className="operation"
                  src="/public/assets/ytdp_logo.png"
                  style={{ width: "100%" }}
                  alt="logo"
                /></Col>

                <Col span={20} style={{
                    fontFamily:"Roboto', sans-serif !important",
                    color:"#428bca",
                    fontWeight:"bold"
                }}> <div style={{paddingTop:"4%",textAlign:"center"}}>HỆ THỐNG TIÊM CHỦNG CHO TRẺ TẠI PHƯỜNG</div>
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
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
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
                  <Link href="#" variant="body2">
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
    </ThemeProvider>
  );
}

export default Login;
