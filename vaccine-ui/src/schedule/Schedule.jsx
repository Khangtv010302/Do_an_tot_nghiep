import axios from "axios";
import App from "../App";
import LoadingModal from "../loading/Loading";
import "./Schedule.css";
import {
  Space,
  Table,
  Input,
  Checkbox,
  Button,
  Modal,
  Form,
  Tooltip,
  notification,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Vaccine from "../vaccine/vaccine";

function Schedule() {
  //notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  //declair variable
  const [monthOldSelectDisabled, setMonthOldSelectDisabled] = useState(false);

  const [page, setPage] = React.useState(1);
  const [showLoading, setShowLoading] = useState(false);
  const [operation, setOperation] = useState("");
  const [dataGroup, setDataGroup] = useState("");
  const [form] = Form.useForm();
  const [listVaccine, setListVaccine] = useState([]);
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

  //tanStackQuerry
  const queryClient = useQueryClient();

  //response
  const [response, setResponse] = useState();

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoSchedule"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/API/GeneralInjection")
        .then((res) => res.data.data),
  });
  const addSchedule = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/GeneralInjection",
        headers: {
          "Content-type": "application/json",
        },
        data: values,
      }).then((response) => setResponse(response));
    },
    onSuccess: () => {
      setShowLoading(false);
      setOperation("");
      queryClient.invalidateQueries({ queryKey: ["repoSchedule"] });
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const deleteSchedule = useMutation({
    mutationFn: (param) => {
      console.log(param);
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/GeneralInjection/VaccineId-MonthOld",
        headers: {
          "Content-type": "application/json",
        },
        params: param,
      }).then((response) => setResponse(response));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoSchedule"] });
      openNotification("Thành công", "Đã xóa khỏi danh sách");
      setShowLoading(false);
      setOperation("");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const deleteScheduleByVaccineId = useMutation({
    mutationFn: (vaccineId) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/GeneralInjection/VaccineId",
        headers: {
          "Content-type": "application/json",
        },
        params: { vaccineId },
      }).then((response) => setResponse(response));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoSchedule"] });
      openNotification("Thành công", "Đã xóa khỏi danh sách");
      setShowLoading(false);
      setOperation("");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  //useEffect

  const columns = [
    {
      title: "#",
      dataIndex: "",
      key: "index",
      render: (_, __, index) => (page - 1) * 4 + index + 1,
    },
    {
      title: "Vắc xin",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kháng nguyên",
      dataIndex: "antigen",
      key: "antigen",
    },
    {
      title: "Tháng tuổi tiêm chủng",
      dataIndex: "monthOlds",
      key: "monthOlds",
     render: (monthOlds) => (
  <span>
    {monthOlds ? monthOlds.split(",").map((month) => parseInt(month.trim())).sort((a, b) => a - b).map((month) => month === 0 ? "Sơ sinh" : month.toString()).join(", ") : null}
  </span>
),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xóa" color={"blue"}>
            <FontAwesomeIcon
              className="button-icon"
              style={{ fontSize: "20px" }}
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
  let newData = [];

  // Kiểm tra xem có danh sách vaccine không
  if (data && data.length > 0) {
    // Xác định danh sách duy nhất của các loại vaccine
    const uniqueVaccines = Array.from(
      new Set(data.map((vaccine) => vaccine.name))
    );

    // Tạo mảng dữ liệu mới
    newData = uniqueVaccines.map((name) => {
      const monthOlds = data
        .filter((vaccine) => vaccine.name === name)
        .map((vaccine) => vaccine.monthOld);
      const antigen = data.find((vaccine) => vaccine.name === name).antigen;
      const vaccineId = data.find((vaccine) => vaccine.name === name).vaccineId;
      return {
        vaccineId: vaccineId,
        antigen: antigen,
        name: name,
        monthOlds: monthOlds.join(", "), // Chuyển danh sách các tháng thành một chuỗi
      };
    });
  }
  //function
  const renderMonthOlds = (monthOlds) => {
    const monthArray = monthOlds.split(",").map((month) => parseInt(month.trim()));
    const sortedMonthArray = monthArray.sort((a, b) => a - b);
    const sortedMonthStrings = sortedMonthArray.map((month) => month === 0 ? "Sơ sinh" : month.toString());
    console.log(sortedMonthStrings.join(", "))
    return sortedMonthStrings.join(", ");
  };
  const getListVaccine = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/Vaccine/OnlyName",
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      setListVaccine(response.data.data);
    });
  };
  const handleCancel = () => {
    setOperation("");
  };
  const handleAdd = () => {
    getListVaccine();
    setMonthOldSelectDisabled(false)
    form.resetFields();
    setOperation("Add");
  };
  const handleDelete = (record) => {
    setMonthOldSelectDisabled(false)
    console.log(record);
    getListVaccine();
    form.resetFields();
    form.setFieldsValue({
      vaccineId: record.vaccineId,
      monthOlds: record.monthOlds,
      name: record.name,
    });
    console.log(record);
    setOperation("Delete");
  };
  const onFinish = (values) => {
    if (operation === "Add") {
      setShowLoading(true);
      addSchedule.mutate(values);
    }
    if (operation === "Delete") {
      console.log(values);
      if (monthOldSelectDisabled === true) {
        setShowLoading(true);
        deleteScheduleByVaccineId.mutate(values.vaccineId);
      } else {
        const param = {
          vaccineId: values.vaccineId,
          monthOld: values.monthOld,
        };
        setShowLoading(true);
        deleteSchedule.mutate(param);
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <App onChose={"Schedule"}>
      {contextHolder}
      <h2 className="header">Quản lý lịch tiêm chủng</h2>
      <div className="center">
        <Button
          type="primary"
          onClick={handleAdd}
          style={{
            marginBottom: "1%",
            textAlign: "left",
          }}
        >
          <FontAwesomeIcon
            className="button-icon"
            icon={faPlus}
            style={{ marginRight: "5%", color: "white" }}
          />
          Thêm
        </Button>
        <Table
          loading={isLoading}
          showSorterTooltip={{ target: "sorter-icon" }}
          columns={columns}
          dataSource={newData}
          rowKey="id"
          pagination={{
            defaultPageSize: 4,
            position: ["bottomCenter"],
            onChange(current) {
              setPage(current);
            },
          }}
        />
        <Modal
          title="Xóa tháng tiêm chủng"
          open={operation !== ""}
          onCancel={handleCancel}
          footer={null}
          form={form}
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
              maxWidth: 500,
            }}
            form={form}
          >
            <Form.Item name="vaccineId" style={{ display: "none" }}></Form.Item>

            {operation === "Add" ? (
              <Form.Item
              label="Vắc xin"
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
              <Select>
                {listVaccine.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            ) : null}
            {operation === "Delete" ? (
              <Form.Item
                label="Vắc xin"
                name="name"
                style={{
                  width: "100%", // Adjust width as needed
                }}
              >
                <span>{form.getFieldValue("name")}</span>
              </Form.Item>
            ) : null}
            {operation === "Delete" ? (
              <Form.Item
                label="Các tháng tiêm chủng"
                name="monthOlds"
                style={{
                  width: "100%", // Adjust width as needed
                }}
              >
                <span>
                  {form.getFieldValue("monthOlds")
                    ? renderMonthOlds(form.getFieldValue("monthOlds"))
                    : null}
                </span>
              </Form.Item>
            ) : null}

            <Form.Item
              label="Tháng tiêm chủng"
              name="monthOld"
              style={{
                width: "100%", // Adjust width as needed
              }}
              rules={monthOldSelectDisabled === false ? [
                {
                  required: true,
                  message: "Vui lòng chọn tháng tiêm",
                },
              ]: null}
            >
              <Select disabled={monthOldSelectDisabled === true}>
                {listMonths.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="id" style={{ display: "none" }}></Form.Item>
            {operation === "Delete" ? (
              <Checkbox
                style={{
                  marginBottom: "4%",
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
                checked={monthOldSelectDisabled}
                onChange={(e) => setMonthOldSelectDisabled(e.target.checked)}
              >
                Xóa hết các tháng tuổi tiêm chủng của vắc xin này !!
              </Checkbox>
            ) : null}

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
        <LoadingModal showLoading={showLoading} />
      </div>
    </App>
  );
}

export default Schedule;
