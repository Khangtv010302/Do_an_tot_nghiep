import axios from "axios";
import { format, min } from "date-fns";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import App from "../App";
import Cookies from "js-cookie";
import {
  Space,
  Table,
  Input,
  Button,
  Modal,
  Dropdown,
  Form,
  notification,
  Radio,
  Select,
  Switch,
  Menu,
  Row,
  Checkbox,
  Col,
  Grid,
  Tooltip,
  Upload,
  DatePicker,
  message,
  ConfigProvider,
} from "antd";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusOutlined } from "@ant-design/icons";
import { render } from "react-dom";
import LoadingModal from "../loading/Loading";
import ObjectSchedule from "../object_schedule/Object_Schedule";

function Storage() {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  //alert
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };

  //declare variable
  const [fullname,setFullname]=useState("");
  const [listVaccine, setListVaccine] = useState([]);
  const [listUnitDelivering, setListUnitDelivering] = useState([]);
  const [listStorageVaccine, setListStorageVaccine] = useState([]);
  const [listStorageVaccineTemp, setListStorageVaccineTemp] = useState([]);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [page, setPage] = React.useState(1);
  const [response, setResponse] = useState([]);
  const dateFormat = "YYYY-MM-DD";
  const customLocale = {
    emptyText: '"Không có phiếu nhập', // Change this to your custom message
  };
  const vaccineLocale = {
    emptyText: '"Không có vắc xin', // Change this to your custom message
  };
  const [dataById, setDataById] = useState({});
  const [dataByIdTemp, setDataByIdTemp] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const [minDate, setMinDate] = useState();
  const today = new Date();
  const [form] = Form.useForm();
  const [subForm] = Form.useForm();
  const [operation, setOperation] = useState("");
  const [subOperation, setSubOperation] = useState("");
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [firstDay, setFirstDay] = useState(formatDate(firstDayOfMonth));
  const [lastDay, setLastDay] = useState(formatDate(lastDayOfMonth));
  const columns = [
    {
      title: "#",
      dataIndex: "",
      width: "5%",
      key: "index",
      render: (_, __, index) => (
        <span style={{ fontSize: "12px" }}>{(page - 1) * 3 + index + 1}</span>
      ),
    },
    {
      title: "Đơn vị xuất",
      dataIndex: "unitDeliveringId",
      key: "unitDeliveringId",
      //  width: "9%",
      render: (unitDeliveringId) =>
        listUnitDelivering.find(
          (unitDelivering) => unitDelivering.id === unitDeliveringId
        ).name,
    },
    {
      title: "Ngày xuất",
      dataIndex: "dateDelivering",
      responsive: ["md"],
      key: "dateDelivering",
      render: (dateDelivering) =>
        format(new Date(dateDelivering), "dd/MM/yyyy"),
    },
    {
      title: "Cán bộ xuất",
      dataIndex: "officerDelivering",
      //  responsive: ["lg"],
      key: "officerDelivering",
      //  width: "6%",
    },
    {
      title: "Đơn vị nhập",
      dataIndex: "unitReceiving",
      //  width: "20%",
      //  responsive: ["sm"],
      key: "unitReceiving",
    },
    {
      title: "Ngày nhập",
      dataIndex: "dateReceiving",
      responsive: ["md"],
      key: "dateReceiving",
      render: (unitReceiving) => format(new Date(unitReceiving), "dd/MM/yyyy"),
    },
    {
      title: "Cán bộ nhập",
      dataIndex: "officerReceiving",
      //  responsive: ["lg"],
      key: "officerReceiving",
      //  width: "6%",
    },
  ];
  const columns1 = [
    {
      title: "#",
      dataIndex: "",
      width: "4%",
      key: "index",
      render: (_, __, index) => (
        <span style={{ fontSize: "12px" }}>{(page - 1) * 10 + index + 1}</span>
      ),
    },
    {
      title: "Tên vắc xin",
      dataIndex: "vaccineId",
      key: "vaccineId",
      width: "10%",
      render: (vaccineId) =>
        listVaccine.find((vaccine) => vaccine.id === vaccineId).name,
    },
    ...(operation !== "Add"
    ? [
        {
          title: "SL tồn lúc xuất",
          dataIndex: "",
          responsive: ["md"],
          key: "",
          width: "7%",
          render: (_, record) =>
            record.quantityReceiving - record.quantityDelivering,
        },
      ]
    : []),
    {
      title: "SL tồn",
      dataIndex: "quantityReceiving",
      width: "7%",
      key: "quantityReceiving",
    },
   
    ...(operation !== "Add"
      ? [
          {
            title: "SL xuất",
            dataIndex: "quantityDelivering",
            width: "7%",
            key: "quantityDelivering",
          },
        ]
      : []),
    {
      title: "Đơn vị",
      dataIndex: "vaccineId",
      responsive: ["xl"],
      key: "vaccineId",
      width: "7%",
      render: (vaccineId) =>
        listVaccine.find((vaccine) => vaccine.id === vaccineId).unit,
    },
    {
      title: "Quy cách đóng gói",
      dataIndex: "vaccineId",
      responsive: ["xl"],
      width: "15%",
      key: "vaccineId",
      render: (vaccineId) => (
        <span style={{ fontSize: "14px" }}>
          {listVaccine.find((vaccine) => vaccine.id === vaccineId).packing} liều 1 lọ
  
        </span>
      ),
    },
    {
      title: "Số lô",
      dataIndex: "lotNumber",
      width: "10%",
      key: "lotNumber",
    },
    {
      title: "Hạn dùng",
      dataIndex: "expiredDate",
      width: "10%",
      responsive: ["xl"],
      key: "expiredDate",
      render: (expiredDate) => format(new Date(expiredDate), "dd/MM/yyyy"),
    },

    ...(operation !== "Detail" && operation !== "Delete"
      ? [
          {
            width: "8%",
            title: <span style={{ fontSize: "14px" }}>Thao tác</span>,
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Tooltip title="Chỉnh sửa" color={"blue"}>
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faPencil}
                    onClick={() => {
                      handleSubUpdate(record);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Xóa mũi tiêm" color={"blue"}>
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faTrashCan}
                    onClick={() => {
                      handleSubDelete(record);
                    }}
                  />
                </Tooltip>
              </Space>
            ),
          },
        ]
      : []),
  ];
  //useEffect
  useEffect(() => {
    getListVaccine();
    getListUnitDelivering();
    getFullnameByUsername(getUsername());
  }, [operation]);
  //tanstack querry
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoStorage"],
    queryFn: () =>
      axios({
        method: "get",
        url: "http://localhost:8080/API/ReceiveDeliver/FromDate-ToDateByDateReceiving",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: { fromDay: firstDay, toDay: lastDay },
      }).then((response) => {
        setResponse(response.data.data);
        return response.data.data;
      }),
  });
  const searchStorage = useMutation({
    mutationFn: () => {
      return axios({
        method: "get",
        url: "http://localhost:8080/API/ReceiveDeliver/FromDate-ToDateByDateReceiving",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params: { fromDay: firstDay, toDay: lastDay },
      }).then((response) => {
        setResponse(response.data.data);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStorage"] });
      setShowLoading(false);
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const addStorage = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "post",
        url: "http://localhost:8080/API/ReceiveDeliver",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStorage"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const updateStorage = useMutation({
    mutationFn: (values) => {
      return axios({
        method: "put",
        url: "http://localhost:8080/API/ReceiveDeliver",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        data: values,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStorage"] });
      setShowLoading(false);
      setDataById(dataByIdTemp);
      setOperation("Detail");
      openNotification("Thành công", "Đã cập nhật thông tin");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const deleteStorage = useMutation({
    mutationFn: (receiverDeliverId ) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/ReceiveDeliver",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params:{receiverDeliverId },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoStorage"] });
      setShowLoading(false);
      setOperation("");
      openNotification("Thành công", "Xóa phiếu nhập thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  //function
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
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") !== undefined)
      return sessionStorage.getItem("jwtToken");
    if (Cookies.get("jwtToken") !== undefined) return Cookies.get("jwtToken");
  };
  const disabledDateFirstDay = (currentDate) => {
    console.log(firstDay)
    return currentDate.isBefore(dayjs(firstDay, "YYYY-MM-DD"), "day");
  };
  const disabledDateDelivering = (currentDate) => {
    return currentDate.isBefore(dayjs(minDate, "YYYY-MM-DD"), "day");
  };


  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  const handleSubAdd = () => {
    setFirstDay
    subForm.resetFields();
    setSubOperation("Add");
  };
  const handleSubUpdate = (record) => {
      record = {
        ...record,
        expiredDate: dayjs(record.expiredDate,"YYYY-MM-DD")
      }
      subForm.setFieldsValue(record);
    setSubOperation("Update");
  };
  const handleSubDelete = (record) => {
    record = {
      ...record,
      expiredDate: dayjs(record.expiredDate,"YYYY-MM-DD")
    }
    console.log(record);
    subForm.setFieldsValue(record);
  setSubOperation("Delete");
};

  const handleReminder = (record) => {
    console.log(record);
    setOperation("Reminder");
    form.setFieldsValue(record);
    form.setFieldValue(
      "scheduledDate",
      dayjs(record.scheduledDate, "YYYY-MM-DD")
    );
  };
  const handleDelete = () => {
    setOperation("Delete");
    getListDetailReceiveDelive(dataById.id);
    form.setFieldsValue(dataById);
    form.setFieldValue(
      "dateDelivering",
      dayjs(dataById.dateDelivering, "YYYY-MM-DD")
    );
    form.setFieldValue(
      "dateReceiving",
      dayjs(dataById.dateReceiving, "YYYY-MM-DD")
    );
  };
  const handleUpdate = () => {
    setListStorageVaccineTemp(listStorageVaccine)
    setMinDate(dataById.dateDelivering);
    setOperation("Update");
    getListDetailReceiveDelive(dataById.id);
    form.setFieldsValue(dataById);
    form.setFieldValue(
      "dateDelivering",
      dayjs(dataById.dateDelivering, "YYYY-MM-DD")
    );
    form.setFieldValue(
      "dateReceiving",
      dayjs(dataById.dateReceiving, "YYYY-MM-DD")
    );
  };
  const handleDetail = (record) => {
    setDataById(record);
    console.log(record);
    setOperation("Detail");
    getListDetailReceiveDelive(record.id);
    form.setFieldsValue(record);

    setShowLoading(false);
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
  const getListUnitDelivering = () => {
    const name="";
    axios({
      method: "get",
      url: "http://localhost:8080/API/UnitDelivering",
      headers: {
        "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
      },
      params:{name}
    }).then((response) => {
      setListUnitDelivering(response.data.data);
    });
  };
  const getListDetailReceiveDelive = (receiveDeliverId) => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/ReceiveDeliver/DetailByReceiveDeliverId",
      headers: {
        "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
      },
      params: { receiveDeliverId },
    }).then((response) => {
      setListStorageVaccine(response.data.data);
    });
  };
  const handleAdd = () => {
  
    form.resetFields();
    form.setFieldValue("officerReceiving",fullname)
    setMinDate(dayjs());
    setListStorageVaccine([]);
    setOperation("Add");
  };

  const handleCancel = () => {
    console.log(listStorageVaccineTemp);
    setListStorageVaccine(listStorageVaccineTemp);
    if (operation === "Delete" || operation === "Update"){
      setOperation("Detail");
    }

    else setOperation("");
  };
  const handleSubCancel = () => {
    setSubOperation("");
  };
  const handleSearch = () => {
    console.log(firstDay);
    console.log(lastDay);
    setShowLoading(true);
    searchStorage.mutate();
  };
  function onFinish(values) {
    values = {
      ...values,
      dateDelivering: values.dateDelivering.format("YYYY-MM-DD"),
      dateReceiving: values.dateReceiving.format("YYYY-MM-DD"),
    };
    if (listStorageVaccine.length > 0) {
      if (operation === "Add") {
        values = {
          ...values,
          deliverDetailRequests: listStorageVaccine,
        };
        setShowLoading(true);
        addStorage.mutate(values);
      }

      if (operation === "Update") {
       
        values = {
          ...values,
          receiveDeliverUpdateRequests: listStorageVaccine,
        };
        console.log(values)
        setDataByIdTemp(values);
        setShowLoading(true);
        updateStorage.mutate(values);
      }
    } else {
      openNotification("Thất bại", "Danh sách vắc xin không được để trống");
    }
    if (operation === "Delete") {
        
      setShowLoading(true);
      deleteStorage.mutate(values.id);
    }
  }
  function onSubFinish(values) {
    values = {
      ...values,
      expiredDate: values.expiredDate.format("YYYY-MM-DD"),
    };
    console.log (listStorageVaccine);
    console.log(values);
    if (subOperation === "Add") {
      values = {
        ...values,
        quantityDelivering: 0,
      };
      if (
        !listStorageVaccine.some(
          (vaccine) => vaccine.vaccineId === values.vaccineId
        )
      ) {
        setListStorageVaccine([...listStorageVaccine, values]);
        openNotification("Thành công", "Thêm vắc xin thành công");
        setSubOperation("");
      } else {
        openNotification("Thất bại", "Vắc xin đã có trong danh sách");
      }
    }
    if (subOperation === "Update") {
      setListStorageVaccine(listStorageVaccine.map(vaccine => {
        if (vaccine.vaccineId === values.vaccineId) {
          return { 
              vaccineId:values.vaccineId,
              expiredDate:values.expiredDate,
              lotNumber:values.lotNumber,
              quantityDelivering:values.quantityDelivering,
              quantityReceiving:values.quantityReceiving
           };
        } else {
          // No changes
          return vaccine;
        }
      }));
    setSubOperation("")
    }
    if (subOperation === "Delete") {
      setListStorageVaccine(prevList => {
        const updatedList = prevList.filter(vaccine => vaccine.vaccineId !== values.vaccineId);
        if (updatedList.length === prevList.length) {
            openNotification("Thất bại","Không tìm thấy vắc xin")
        }else{
          openNotification("Thành công","Đã xóa vắc xin ra khỏi danh sách")
        }
        return updatedList;
    });
    setSubOperation("");
    }
  }
  const onFinishFailed = (errorInfo) => {
    openNotification("Thất bại", "Không thể thêm phiếu nhập");
  };
  const onSubFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    openNotification("Thất bại", "Không thể thêm vắc xin");
  };

  return (
    <App onChose={"Storage"}>
      {contextHolder}

      {operation === "" ? (
        <div>
          <Row style={{ border: "1px solid",borderColor:"#A9A9A9" }}>
            <Col span={24}>
              <Row>
                <Col span={10}>
                  <div
                    style={{
                      margin: "3%",
                      fontSize: "150%",
                      fontWeight: "500",
                    }}
                  >
                    Nhập xuất vắc xin
                  </div>
                </Col>
                <Col span={14} style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    style={{ margin: "3%" }}
                    className="button-add"
                    onClick={handleAdd}
                  >
                    Thêm mới phiếu nhập
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col
              span={24}
              style={{
                borderTop: "1px solid",
                borderColor:"#A9A9A9",
                padding: "1%",
                paddingTop: "2%",
              }}
            >
              <Row>
                <Col xs={24} sm={24} md={11} lg={9} xl={9}>
                  {" "}
                  <Form.Item label="Ngày bắt đầu từ">
                    <DatePicker
                      allowClear={false}
                      defaultValue={dayjs(firstDay, dateFormat)}
                      style={{ width: "100%" }}
                      format={"DD/MM/YYYY"}
                      onChange={(e) => {
                        setFirstDay(e.format("YYYY-MM-DD"));
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                  <Form.Item
                    label="Đến ngày"
                    allowClear={false}
                    style={{
                      marginLeft:
                        screens.xl || screens.lg || screens.md ? "2%" : null,
                    }}
                  >
                    <DatePicker
                    allowClear={false}
                      defaultValue={dayjs(lastDay, dateFormat)}
                      style={{ width: "100%" }}
                      disabledDate={disabledDateFirstDay}
                      format={"DD/MM/YYYY"}
                      onChange={(e) => {
                        setLastDay(e.format("YYYY-MM-DD"));
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={5}
                  lg={5}
                  xl={5}
                  style={{ textAlign: "center" }}
                >
                  <Button type="primary" onClick={handleSearch}>
                    Tìm kiếm phiếu nhập xuất
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ border: "1px solid", marginTop: "1%",  borderColor:"#A9A9A9", }}>
            <Col
              span={24}
              style={{ margin: "1%", fontSize: "150%", fontWeight: "500" }}
            >
              Danh sách phiếu nhập xuất
            </Col>
            <Col span={24} style={{ borderTop: "1px solid",  borderColor:"#A9A9A9", }}>
              {" "}
              <Table
                style={{ margin: "1%" }}
                scroll={{ x: 120, y: 400 }}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      record = {
                        ...record,
                        dateDelivering: dayjs(
                          record.dateDelivering,
                          "YYYY-MM-DD"
                        ),
                        dateReceiving: dayjs(
                          record.dateReceiving,
                          "YYYY-MM-DD"
                        ),
                      };
                      setDataById(record);
                      setShowLoading(true);
                      handleDetail(record);
                    },
                  };
                }}
                rowClassName="table-row"
                locale={customLocale}
                loading={isLoading}
                showSorterTooltip={{ target: "sorter-icon" }}
                columns={columns}
                dataSource={response}
                rowKey="id"
                pagination={{
                  defaultPageSize: 3,
                  position: ["bottomCenter"],
                  onChange(current) {
                    setPage(current);
                  },
                }}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <div>
          <Row style={{ border: "1px solid",  borderColor:"#A9A9A9", }}>
            <Col span={12}>
              <div
                style={{ margin: "1%", fontSize: "150%", fontWeight: "500" }}
              >
                {operation === "Add"
                  ? " Thêm mới phiếu nhập"
                  : operation === "Detail" || operation === "Delete"
                  ? "Thông tin phiếu nhập"
                  : operation === "Update"
                  ? "Cập nhật thông tin phiếu nhập"
                  : null}
              </div>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <div
                style={{ margin: "1%", fontSize: "150%", fontWeight: "500" }}
              >
                {operation === "Detail" ? (
                  <Button
                    onClick={handleUpdate}
                    style={{
                      textAlign: "center",
                      width: "10%",
                      fontSize: "12px",
                      marginLeft: "5px",
                      fontWeight: "500",
                    }}
                    type="primary"
                  >
                    <FontAwesomeIcon
                      icon={faPencil}
                      style={{ marginRight: "5px" }}
                    />
                    Sửa
                  </Button>
                ) : null}

                {operation === "Detail" ? (
                  <Button
                    onClick={handleDelete}
                    style={{
                      textAlign: "center",
                      width: "10%",
                      fontSize: "12px",
                      marginLeft: "5px",
                      fontWeight: "500",
                    }}
                    type="primary"
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{ marginRight: "5px" }}
                    />
                    Xóa
                  </Button>
                ) : null}
              </div>
            </Col>
            <Col
              span={24}
              style={{
                borderTop: "1px solid",
                borderColor:"#A9A9A9",
                padding: "1%",
              }}
            >
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                name="wrap"
                colon={false}
                style={{
                  marginTop: "2%",
                  maxWidth: "100%",
                }}
                form={form}
              >
                {operation !== "Add" ? (
                  <Form.Item style={{ display: "none" }} name="id"></Form.Item>
                ) : null}
                <Row>
                  <Col span={screens.xl ? 8 : screens.lg ? 12 : screens.md ? 16 :24} style={{ paddingLeft: "1%" }}>
                    <Form.Item
                      label="Đơn vị xuất:"
                      labelCol={{ span: 10 }} // Số cột cho label
                      wrapperCol={{ span: 14 }} // Số cột cho wrapper
                      initialValue={listUnitDelivering[0].id}
                      labelAlign="left"
                      name="unitDeliveringId"
                      style={{
                        width: "100%", // Adjust width as needed
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập đơn vị xuất",
                        },
                      ]}
                    >
                      <Select
                        style={
                          operation !== "Add" ? { pointerEvents: "none" } : {}
                        }
                      >
                        {listUnitDelivering.map((item) => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ marginLeft: "1%" }}>
                    <Form.Item
                      label="Cán bộ xuất:"
                      labelCol={{ span: 10 }} // Số cột cho label
                      wrapperCol={{ span: 14 }} // Số cột cho wrapper
                      labelAlign="left"
                      name="officerDelivering"
                      style={{
                        width: "100%", // Adjust width as needed
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên người nhập",
                        },
                      ]}
                    >
                      <Input
                        name="officerDelivering"
                        readOnly={operation !== "Add" && operation !== "Update"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={screens.xl ? 7 : screens.lg ? 10 : screens.md ? 8 :12} style={{ paddingLeft: "1%" }}>
                    <Form.Item
                      label="Ngày xuất"
                      name="dateDelivering"
                      labelCol={{ span: 10 }} // Số cột cho label
                      wrapperCol={{ span: 14 }} // Số cột cho wrapper
                      labelAlign="left"
                      initialValue={dayjs()}
                      style={{
                        width: "100%", // Adjust width as needed
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày xuất",
                        },
                      ]}
                    >
                      <DatePicker
                        onChange={(e) => {
                          console.log(e.format("YYYY-MM-DD"));
                          setMinDate(e.format("YYYY-MM-DD"));
                        }}
                        allowClear={false}
                        format={"DD/MM/YYYY"}
                        style={
                          operation === "Detail" || operation === "Delete"
                            ? { pointerEvents: "none", width: "100%" }
                            : { width: "100%" }
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={screens.xl ? 8 : screens.lg ? 12 : screens.md ? 16 :24} style={{ paddingLeft: "1%" }}>
                    <Form.Item
                      initialValue={"TYT Vĩnh Thọ"}
                      label="Đơn vị nhập:"
                      labelCol={{ span: 10 }} // Số cột cho label
                      wrapperCol={{ span: 14 }} // Số cột cho wrapper
                      labelAlign="left"
                      name="unitReceiving"
                      style={{
                        width: "100%", // Adjust width as needed
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập đơn vị nhập",
                        },
                      ]}
                    >
                      <Input
                        name="unitReceiving"
                        readOnly={operation !== "Add" && operation !== "Update"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8} style={{ marginLeft: "1%" }}>
                    <Form.Item
                      label="Cán bộ nhập:"
                      labelCol={{ span: 10 }} // Số cột cho label
                      wrapperCol={{ span: 14 }} // Số cột cho wrapper
                      labelAlign="left"
                      name="officerReceiving"
                      style={{
                        width: "100%", // Adjust width as needed
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên cán bộ nhập",
                        },
                      ]}
                    >
                      <Input
                        name="officerReceiving"
                        readOnly={operation !== "Add" && operation !== "Update"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={screens.xl ? 7 : screens.lg ? 10 : screens.md ? 8 :12} style={{ paddingLeft: "1%" }}>
                    <Form.Item
                      label="Ngày nhập"
                      name="dateReceiving"
                      labelCol={{ span: 10 }} // Số cột cho label
                      wrapperCol={{ span: 14 }} // Số cột cho wrapper
                      labelAlign="left"
                      style={{
                        width: "100%", // Adjust width as needed
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng ngày nhập",
                        },
                      ]}
                    >
                      <DatePicker
                        allowClear={false}
                        disabledDate={disabledDateDelivering}
                        preserveInvalidOnBlur={true}
                        format={"DD/MM/YYYY"}
                        onChange={(e) => {
                          setMinDate(e.format("YYYY-MM-DD"));
                        }}
                        style={
                          operation === "Detail" || operation === "Delete"
                            ? { pointerEvents: "none", width: "100%" }
                            : { width: "100%" }
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} style={{ marginLeft: "1%" }}>
                    <Form.Item
                      label="Ghi chú:"
                      labelCol={{ span: 3 }} // Số cột cho label
                      wrapperCol={{ span: 13 }} // Số cột cho wrapper
                      labelAlign="left"
                      name="note"
                      style={{
                        width: "100%", // Adjust width as needed
                      }}
                    >
                      <Input
                        style={{
                          width: "98%", // Adjust width as needed
                          marginLeft: "10px",
                        }}
                        name="note"
                        readOnly={operation !== "Add" && operation !== "Update"}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    {operation === "Detail" || operation === "Delete" ? null : (
                      <Button type="primary" onClick={handleSubAdd}>
                        Thêm vắc xin
                      </Button>
                    )}
                    <Table
                      style={{ margin: "1%", border: "1px solid",  borderColor:"#A9A9A9",  }}
                      scroll={{ x: 120, y: 300 }}
                      // rowClassName="table-row"
                      locale={vaccineLocale}
                      // loading={isLoading}
                      showSorterTooltip={{ target: "sorter-icon" }}
                      columns={columns1}
                      dataSource={listStorageVaccine}
                      rowKey="id"
                      pagination={false}
                    />
                  </Col>
                </Row>
                <Row>
                <Col span={12}>
                  {operation === "Delete" ? (
                    <div
                      style={{
                        color: "#ff0f0f",
                        fontSize: "20px",
                        fontWeight: "bold",
                        paddingLeft: "2%",
                      }}
                    >
                      {" "}
                      Bạn có muốn xóa phiếu nhập này !!
                    </div>
                  ) : null}
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Form.Item label=" ">
                    <div className="submit">
                      {operation === "Detail" ? null : (
                        <Button type="primary" htmlType="submit">
                          {operation === "Add" ? "Thêm" : null}
                          {operation === "Update"
                            ? "Xác nhận chỉnh sửa thông tin"
                            : null}
                          {operation === "Delete" ? "Xóa" : null}
                        </Button>
                      )}

                      <Button
                        style={{
                          textAlign: "right",
                          marginLeft: "1%",
                          marginRight: "1%",
                          color: "#4d79ff",
                          fontWeight: "500",
                          backgroundColor: "#f2f2f2",
                        }}
                        onClick={handleCancel}
                      >
                        Quay lại
                      </Button>
                    </div>
                  </Form.Item>
                </Col>
                </Row>
               
              </Form>
            </Col>
          </Row>
        </div>
      )}
      {subOperation !== "" ? (
        <Modal
          title={
            subOperation === "Add"
              ? "Thêm vắc xin"
              : subOperation === "Update"
              ? "Cập nhật vắc xin"
              : subOperation === "Delete"
              ? "Xóa vắc xin"
              : null
          }
          open={subOperation !== ""}
          onCancel={handleSubCancel}
          footer={null}
          width={500}
        >
          <Form
            onFinish={onSubFinish}
            onFinishFailed={onSubFinishFailed}
            name="wrap"
            labelAlign="left"
            labelCol={{ span: 7 }} // Đặt kích thước của cột chứa nhãn là 6
            wrapperCol={{ span: 16 }}
            colon={false}
            style={{
              maxWidth: "100%",
            }}
            form={subForm}
          >
            <Form.Item
              label="Vắc xin:"
              name="vaccineId"
              labelAlign="left"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vắc xin",
                },
              ]}
            >
              <Select
                style={subOperation !== "Add" ? { pointerEvents: "none" } : {}}
              >
                {listVaccine.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Đơn vị:"
              name="vaccineId"
              labelAlign="left"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vắc xin",
                },
              ]}
            >
              <Select style={{ pointerEvents: "none" }}>
                {listVaccine.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.unit}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Phương thức đóng gói:"
              name="vaccineId"
              labelAlign="left"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn vắc xin",
                },
              ]}
            >
              <Select style={{ pointerEvents: "none" }}>
                {listVaccine.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.packing}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              labelCol={{ span: 10 }}
              labelAlign="left"
              wrapperCol={{ span: 14 }}
              label="Số lượng"
              name="quantityReceiving"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng",
                },
              ]}
            >
              <Input
              min={0}
                type="number"
                name="quantityReceiving"
                readOnly={subOperation !== "Add" && subOperation !== "Update"}
              />
            </Form.Item>
            { operation !=="Add" ? (
              <Form.Item
                labelCol={{ span: 10 }}
                labelAlign="left"
                wrapperCol={{ span: 14 }}
                label="Số lượng xuất"
                name="quantityDelivering"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng xuất",
                  },
                ]}
              >
                <Input
                min={0}
                  type="number"
                  name="quantityDelivering"
                  readOnly={subOperation !== "Add" && subOperation !== "Update"}
                />
              </Form.Item>
            ) : null}
            <Form.Item
              labelCol={{ span: 10 }}
              labelAlign="left"
              wrapperCol={{ span: 14 }}
              label="Số lô"
              name="lotNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lô vắc xin",
                },
              ]}
            >
              <Input
                name="lotNumber"
                readOnly={subOperation !== "Add" && subOperation !== "Update"}
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 10 }}
              labelAlign="left"
              wrapperCol={{ span: 14 }}
              defaultValue={dayjs(dayjs(), dateFormat)}
              label="Hạn dùng"
              name="expiredDate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập hạn sử dụng",
                },
              ]}
            >
              <DatePicker
                disabledDate={disabledDate}
                style={{ width: "265px" }}
              />
            </Form.Item>
           
              <div className="submit" style={{marginLeft:"1%"}}>
                <Button
                  style={{
                    marginRight: "1%",

                    marginBottom: "1%",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  {subOperation === "Add" ? "Thêm" : null}
                  {subOperation === "Update"
                    ? "Xác nhận chỉnh sửa thông tin"
                    : null}
                  {subOperation === "Delete" ? "Xóa" : null}
                  {subOperation === "Reminder" ? "Nhắc hẹn" : null}
                </Button>

                <Button
                  style={{
                    textAlign: "right",
                    marginLeft: "1%",
                    color: "#4d79ff",
                    fontWeight: "500",
                    backgroundColor: "#f2f2f2",
                  }}
                  onClick={handleCancel}
                >
                  Quay lại
                </Button>
              </div>
          </Form>
        </Modal>
      ) : null}

      <LoadingModal showLoading={showLoading} />
    </App>
  );
}

export default Storage;
