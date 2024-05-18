import axios, { Axios } from "axios";
import { format } from "date-fns";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import App from "../App";
import "./object_schedule.css";
import {
  Space,
  Table,
  Input,
  Button,
  Modal,
  Form,
  notification,
  message,
  Select,
  Row,
  Col,
  Tooltip,
  DatePicker,
  ConfigProvider,
  Grid,
} from "antd";

import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import { render } from "react-dom";
import LoadingModal from "../loading/Loading";
import { faEye, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { height } from "@mui/system";

function ObjectSchedule({ objectId}) {
  //alert
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  //declare variable
  const { useBreakpoint } = Grid;
  const [fontSizeHeader, setFontSizeHeader] = useState("13px");
  const screens = useBreakpoint();
  const { Search } = Input;
  const [listVaccine, setListVaccine] = useState([]);
  const [page, setPage] = React.useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [form] = Form.useForm();
  const [operation, setOperation] = useState("");
  const [isExist, setIsExist] = useState(3);

  const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
  const listMonths = [
    { id: 0, name: "Sơ sinh" },
    { id: 1, name: "Tháng 1" },
    { id: 2, name: "Tháng 2" },
    { id: 3, name: "Tháng 3" },
    { id: 4, name: "Tháng 4" },
    { id: 5, name: "Tháng 5" },
    { id: 6, name: "Tháng 6" },
    { id: 7, name: "Tháng 7" },
    { id: 8, name: "Tháng 8" },
    { id: 9, name: "Tháng 9" },
    { id: 10, name: "Tháng 10" },
    { id: 11, name: "Tháng 11" },
    { id: 12, name: "Tháng 12" },
    { id: 13, name: "Tháng 13" },
    { id: 14, name: "Tháng 14" },
    { id: 15, name: "Tháng 15" },
    { id: 16, name: "Tháng 16" },
    { id: 17, name: "Tháng 17" },
    { id: 18, name: "Tháng 18" },
    { id: 19, name: "Tháng 19" },
    { id: 20, name: "Tháng 20" },
    { id: 21, name: "Tháng 21" },
    { id: 22, name: "Tháng 22" },
    { id: 23, name: "Tháng 23" },
    { id: 24, name: "Tháng 24" },
  ];

  const columns = [
    {
      title: <span style={{ fontSize: fontSizeHeader }}>#</span>,
      dataIndex: "",
      key: "index",

      width: "6%",
      render: (_, __, index) => (
        <span style={{ fontSize: "12px" }}>{(page - 1) * 10 + index + 1}</span>
      ),
      sorter: (a, b) => a.monthOld - b.monthOld,
      defaultSortOrder: "ascend",
    },
    {
      title: <span style={{ fontSize: fontSizeHeader }}>Vắc xin</span>,
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <span style={{ textAlign: "left" }}>
          <div
            style={{
              fontSize: screens.xs ? "10px" : "14px",
            }}
          >
            {record.name}
          </div>
          <div
            style={{
              fontSize: screens.xs ? "8px" : "12px",
              color: "#B8B8B8",
            }}
          >
            {record.antigen}
          </div>
        </span>
      ),
    },
    {
      title: <span style={{ fontSize: fontSizeHeader }}>Tháng tiêm</span>,
      dataIndex: "monthOld",
      width: "14%",
      responsive: ["md"],
      key: "monthOld",
      render: (monthOld) => (
        <div style={{ textAlign: "center", fontSize: "12px" }}>
          {monthOld === 0 ? "Sơ sinh" : monthOld}{" "}
        </div>
      ),
    },
    {
      title: <span style={{ fontSize: fontSizeHeader }}>Mũi</span>,
      width: "8%",
      responsive: ["sm"],
      dataIndex: "quantity",

      key: "quantity",
    },
    {
      title: <span style={{ fontSize: fontSizeHeader }}>Trạng thái</span>,
      dataIndex: "state",
      key: "state",
      responsive: ["sm"],
      render: (state) => (
        <div>
          {state ? (
            <div
              style={{
                color: "white",
                textAlign: "center",
                backgroundColor: "#5cb85c	",
                fontSize: "10px",
                width: "100px",
                borderRadius: "5px",
                fontFamily: "Palatino Linotype Book Antiqua Palatino",
              }}
            >
              {" "}
              Đã tiêm chủng{" "}
            </div>
          ) : (
            <div
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Roboto",
                backgroundColor: "#d9534f	",
                fontSize: "12px",
                width: "100px",
                borderRadius: "5px",
              }}
            >
              Chưa tiêm chủng{" "}
            </div>
          )}
        </div>
      ),
    },

    {
      title: <span style={{ fontSize: fontSizeHeader }}>Ngày tiêm</span>,
      dataIndex: "vaccinationDate",
      key: "vaccinationDate",
      render: (vaccinationDate) =>
        vaccinationDate === null ? (
          <div className="loading-container">
            <div className="loading"></div>
            <div className="loading-text">Chưa cập nhật</div>
          </div>
        ) : (
          format(new Date(vaccinationDate), "dd/MM/yyyy")
        ),
    },
    {
      title: <span style={{ fontSize: fontSizeHeader }}>Địa điểm</span>,
      dataIndex: "vaccinationLocation",
      key: "vaccinationLocation",
      render: (vaccinationLocation) =>
        vaccinationLocation === null ? (
          <div className="loading-container">
            <div className="loading"></div>
            <div className="loading-text">Chưa cập nhật</div>
          </div>
        ) : (
          vaccinationLocation
        ),
    },
    {
      title: <span style={{ fontSize: fontSizeHeader }}>Thao tác</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết" color={"blue"}>
            <FontAwesomeIcon
              className="button-icon"
              icon={faEye}
              onClick={() => {
                handleDetail(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa" color={"blue"}>
            <FontAwesomeIcon
              className="button-icon"
              icon={faPencil}
              onClick={() => {
                handleUpdate(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa mũi tiêm" color={"blue"}>
            <FontAwesomeIcon
              className="button-icon"
              icon={faTrashCan}
              onClick={() => {
                handleDelete(record);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  //useEffect
  useEffect(() => {
    checkIsExistObjectSchedule();
  }, [showLoading]);
  useEffect(() => {
    getListVaccine();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation]);
  useEffect(() => {
    if (screens.lg) setFontSizeHeader("13px");
    else setFontSizeHeader("10px");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screens]);
  //schedule object
  //tanStackQuerry
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoObjectSchedule"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:8080/API/ObjectInjection/SelectByObjectId?objectId=${objectId}`,
          {
            headers: {
              Authorization: `Bearer ${getJwtToken()}`,
            },
          }
        )
        .then((res) => {
          setResponse(res.data.data);
          return res.data.data;
        }),
  });
  const searchObjectSchedule = useMutation({
    mutationFn: (info) => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/ObjectInjection/SelectByObjectIdAndName",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: info,
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
  const createSchedule = useMutation({
    mutationFn: (objectId) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/ObjectInjection/InsertAll",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: { objectId },
      }).then((response) => console.log(response.data.data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoObjectSchedule"] });
      setShowLoading(false);
      openNotification("Thành công", "Đã tạo thành công sổ tiêm cho trẻ");
      setIsExist(false);
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });

  const addObjectSchedule = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/ObjectInjection",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoObjectSchedule"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const updateObjectSchedule = useMutation({
    mutationFn: (values) => {
      console.log(values);
      return axios({
        method: "put",
        url: "http://localhost:8080/API/ObjectInjection",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoObjectSchedule"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Đã cập nhật thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const deleteObjectSchedule = useMutation({
    mutationFn: (id) => {
      console.log(id);
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/ObjectInjection",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: { id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoObjectSchedule"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Xóa mũi tiêm thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      console.log(error.response.data);
      openNotification("Thất bại", "Không xóa mũi tiêm được");
    },
  });
  //function
  const checkIsExistObjectSchedule = () => {
    return axios({
      method: "get",
      url: "http://localhost:8080/API/Object/isExistObjectIdInjection",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}` 
      },
      params: { objectId: objectId }
    }).then((response) => {
      console.log(response.data.data)
      setIsExist(response.data.data)
      return response.data.data;
    });
};
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") !== null)
      return sessionStorage.getItem("jwtToken");
    if (Cookies.get("jwtToken") !== undefined) return Cookies.get("jwtToken");
  };
  const handleDetail = (record) => {
    if (record.vaccinationDate !== null)
      record = {
        ...record,
        vaccinationDate: dayjs(record.vaccinationDate, "YYYY-MM-DD"),
      };
    console.log(record);

    form.setFieldsValue(record);
    setOperation("Detail");
  };
  const handleUpdate = (record) => {
    if (record.vaccinationDate !== null){
      record = {
        ...record,
        vaccinationDate: dayjs(record.vaccinationDate, "YYYY-MM-DD"),
      };
    }
     
    form.setFieldsValue(record);
    form.setFieldValue("state",!record.state)
  
    setOperation("Update");
  };
  const handleDelete = (record) => {
    if (record.vaccinationDate !== null)
      record = {
        ...record,
        vaccinationDate: dayjs(record.vaccinationDate, "YYYY-MM-DD"),
      };
    form.setFieldsValue(record);
    setOperation("Delete");
  };
  const getListVaccine = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/General/Vaccine",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getJwtToken()}`,
      },
    }).then((response) => {
      setListVaccine(response.data.data);
    });
  };
  const handleAdd = () => {
    form.resetFields();
    setOperation("Add");
  };
  const handleCancel = () => {
    setOperation("");
  };
  const handleCreateSchedule = () => {
    console.log(data);
    setShowLoading(true);
    createSchedule.mutate(objectId);
  };
  function onFinish(values) {
    values = {
      ...values,
      objectId: objectId,
      vaccinationDate: values.vaccinationDate.format("YYYY-MM-DD"),
    };
    if (operation === "Add") {
      console.log(values);
      setShowLoading(true);
      addObjectSchedule.mutate(values);
    }
    if (operation === "Update") {
      console.log(values);
      const updateInfo = {
        id: values.id,
        monthOld: values.monthOld,
        vaccinationDate: values.vaccinationDate,
        vaccinationLocation: values.vaccinationLocation,
        quantity: 1,
        state: values.state,
        reaction: values.reaction,
        lotNumber: values.lotNumber,
      };
      setShowLoading(true);
      updateObjectSchedule.mutate(updateInfo);
    }
    if (operation === "Delete") {
      console.log(values);
      setShowLoading(true);
      deleteObjectSchedule.mutate(values.id);
    }
  }
  const onFinishFailed = (errorInfo) => {
    openNotification("Thất bại", "Không thể thao tác");
  };
  
  return (
    <>
      {contextHolder}
      {isExist <= 0 ? (
        <Space
          style={{
            margin: "2%",
          }}
        >
          Đối tượng chưa có sổ tiêm?
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                    ", "
                  )})`,
                  colorPrimaryHover: `linear-gradient(116deg, ${colors3.join(
                    ", "
                  )})`,
                  colorPrimaryActive: `linear-gradient(116deg, ${colors3.join(
                    ", "
                  )})`,
                  lineWidth: 0,
                },
              },
            }}
          >
            <Button type="primary" onClick={handleCreateSchedule}>
              Tạo sổ tiêm
            </Button>
          </ConfigProvider>
        </Space>
      ) : (
        <div>
          <div style={{ margin: "1%" }}>
            <Row>
              <Col span={12}>
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        colorPrimary: `linear-gradient(116deg,  ${colors3.join(
                          ", "
                        )})`,
                        colorPrimaryHover: `linear-gradient(116deg, ${colors3.join(
                          ", "
                        )})`,
                        colorPrimaryActive: `linear-gradient(116deg, ${colors3.join(
                          ", "
                        )})`,
                        lineWidth: 0,
                      },
                    },
                  }}
                >
                  <Button type="primary" onClick={handleAdd}>
                    Thêm mũi tiêm
                  </Button>
                </ConfigProvider>
              </Col>
              <Col span={12}>
                <div style={{}}>
                  <Search
                    allowClear={true}
                    placeholder="Nhập tên vắc xin"
                    onSearch={(value, _e, info) => {
                      console.log(info?.source, value);
                      setShowLoading(true);
                      searchObjectSchedule.mutate({
                        name: value,
                        objectId: objectId,
                      });
                      setOperation("");
                    }}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <Table
            scroll={{ x: 120, y: 350 }}
            loading={isLoading}
            showSorterTooltip={{ target: "sorter-icon" }}
            columns={columns}
            dataSource={response}
            rowKey="id"
            pagination={{
              defaultPageSize: 10,
              position: ["bottomCenter"],
              onChange(current) {
                setPage(current);
              },
            }}
          />
        </div>
      )}
      <Modal
        title={
          operation === "Detail"
            ? "Thông tin mũi tiêm"
            : operation === "Delete"
            ? "Xóa mũi tiêm"
            : operation === "Add"
            ? "Thêm mũi tiêm"
            : operation === "Update"
            ? "Cập nhật mũi tiêm"
            : null
        }
        open={operation !== ""}
        onCancel={handleCancel}
        footer={null}
        width={550}
      >
        <div style={{}}>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            name="wrap"
            labelAlign="left"
            labelCol={{ span: 7 }} // Đặt kích thước của cột chứa nhãn là 6
            wrapperCol={{ span: 16 }}
            colon={false}
            style={{
              maxWidth: 600,
            }}
            form={form}
          >
            {operation !== "Add" ? (
              <Form.Item style={{ display: "none" }} name="id"></Form.Item>
            ) : null}
            <Form.Item
              label="Vắc xin:"
              name="vaccineId"
              style={{
                width: "100%", // Adjust width as needed
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vắc xin",
                },
              ]}
            >
              <Select
                style={operation !== "Add" ? { pointerEvents: "none" } : {}}
              >
                {listVaccine.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Kháng nguyên:"
              name="vaccineId"
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
              <Select style={{ pointerEvents: "none" }}>
                {listVaccine.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.antigen}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Số lô:"
              name="lotNumber"
              style={{
                width: "100%", // Adjust width as needed
              }}
              
            >
              <Input
                readOnly={operation !== "Add" && operation !== "Update"}
                name="lotNumber"
              />
            </Form.Item>
            <Form.Item
              label="Trạng thái:"
              initialValue={true}
              name="state"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn trạng thái",
                },
              ]}
            >
              <Select
                style={
                  operation ==="Update" ?   { pointerEvents: "none" } :{}
                }
              >
                <Select.Option value={true}>Đã tiêm chủng</Select.Option>
                <Select.Option value={false}>Chưa tiêm chủng</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày tiêm:"
              name="vaccinationDate"
              initialValue={dayjs(undefined)}
         
              rules={[
                { required: true, message: "Vui lòng nhập ngày tiêm chủng" },
              ]}
            >
              <DatePicker
             
                format={"DD/MM/YYYY"}
                style={
                  operation === "Detail" || operation === "Delete"
                    ? { pointerEvents: "none" }
                    : {}
                }
                onChange={(e) => {
                  console.log(e.format("DD-MM-YYYY"));
                }}
              />
            </Form.Item>
            <Form.Item
              label="Tháng tiêm chủng:"
              name="monthOld"
              style={{
                width: "100%", // Adjust width as needed
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tháng tiêm",
                },
              ]}
            >
              <Select
                style={
                  operation === "Detail" || operation === "Delete"
                    ? { pointerEvents: "none" }
                    : {}
                }
              >
                {listMonths.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Địa diểm:"
              initialValue="TYT Vĩnh Thọ"
              name="vaccinationLocation"
              style={{
                width: "100%", // Adjust width as needed
              }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa điểm tiêm",
                },
              ]}
            >
              <Input
                readOnly={operation !== "Add" && operation !== "Update"}
                name="vaccinationLocation"
              />
            </Form.Item>
            
            {operation === "Detail" || operation === "Delete" ? (
              <Form.Item
                label="Phản ứng sau tiêm:"
                name="reaction"
              
              >
                <span>{form.getFieldValue("reaction")}</span>
              </Form.Item>
            ) : (
              <Form.Item
                label="Phản ứng sau tiêm:"
                name="reaction"
                
              >
                <Input.TextArea
                  rows={4}
                  style={{
                    pointerEvents:
                      operation !== "Add" && operation !== "Update"
                        ? "none"
                        : null,
                  }}
                  name="reaction"
                />
              </Form.Item>
            )}

            <Form.Item label=" ">
              <div className="submit">
                {operation === "Detail" ? null : (
                  <Button
                    style={{ textAlign: "right" }}
                    type="primary"
                    htmlType="submit"
                  >
                    {operation === "Add"
                      ? "Thêm"
                      : operation === "Update"
                      ? "Sửa"
                      : "Xóa"}
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
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <LoadingModal showLoading={showLoading} />
    </>
  );
}

export default ObjectSchedule;
