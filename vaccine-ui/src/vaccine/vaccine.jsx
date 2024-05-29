import App from "../App";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import Cookies from "js-cookie";

import LoadingModal from "../loading/Loading";
import "./vaccine.css";
import {
  Space,
  Table,
  Input,
  Button,
  Modal,
  Form,
  notification,
  Select,
  Row,
  Col,
  Upload,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencil,
  faTrashCan,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
function Vaccine() {
  //notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (state, description) => {
    api.info({
      message: `${state}`,
      description: description,
    });
  };
  //tanStackQuerry
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoVaccine"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/API/Vaccine/Search",{
          headers:{
            Authorization: `Bearer ${getJwtToken()}`,
          },
          params:{
            name:searchInfo,
            manufacturerId:manufacturerId
          }
        })
        .then((res) => 
          setTableData(res.data.data)
      ),
    onError: () => {
      openNotification("Thất bại", "Không có dữ liệu");
    },
  });

  const addVaccine = useMutation({
    mutationFn: (values) => {
      console.log(values);
      formData.append("file", file);

      formData.append("name", values.name);
      formData.append("antigen", values.antigen);
      formData.append("packing", values.packing); // Assuming packing is a number
      formData.append("unit", values.unit);
      formData.append("description", values.description);
      formData.append("origin", values.origin);
      formData.append("contraindicated", values.contraindicated);
      formData.append("unwantedEffect", values.unwantedEffect);
      formData.append("preserve", values.preserve);
      formData.append("manufacturerId", values.manufacturerId);
      return axios
        .post("http://localhost:8080/API/Vaccine", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getJwtToken()}`,
          },
        })
        .then((response) => console.log(response.data));
    },
    onSuccess: () => {
      setShowLoading(false);
      queryClient.invalidateQueries({ queryKey: ["repoVaccine"] });
      setOperation("");
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
      console.log(error.response);
    },
  });
  const updateVaccine = useMutation({
    mutationFn: (values) => {
      formData.append("id", values.id);
      formData.append("file", file);
      formData.append("name", values.name);
      formData.append("antigen", values.antigen);
      formData.append("packing", values.packing); // Assuming packing is a number
      formData.append("unit", values.unit);
      formData.append("description", values.description);
      formData.append("origin", values.origin);
      formData.append("contraindicated", values.contraindicated);
      formData.append("unwantedEffect", values.unwantedEffect);
      formData.append("preserve", values.preserve);
      formData.append("manufacturerId", values.manufacturerId);
      formData.append("image", imageUrl);
      return axios
        .put("http://localhost:8080/API/Vaccine", formData, {
          headers: {
              "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getJwtToken()}`,
          },
        })
        .then((response) => console.log(response.data));
    },
    onSuccess: () => {
      setShowLoading(false);
      setOperation("");
      queryClient.invalidateQueries({ queryKey: ["repoVaccine"] });
      openNotification("Thành công", "Đã chỉnh thông tin");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
      console.log(error.response);
    },
  });
  const updateMutation = useMutation(updateVaccine.mutate);

  const deleteVaccine = useMutation({
    mutationFn: (id) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/Vaccine",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getJwtToken()}`,
        },
        params: {
          id,
        },
      }).then((response) => setResponse(response.data));
    },
    onSuccess: () => {
      setOperation("");
      setShowLoading(false);
      queryClient.invalidateQueries({ queryKey: ["repoVaccine"] });
      openNotification("Thành công", "Xóa thành công");
    },
    onError: (error) => {
      setShowLoading(false);
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const columns = [
    {
      title: "#",
      dataIndex: "",
      key: "index",
      render: (_, __, index) => (page - 1) * 8 + index + 1,
    },
    {
      title: "Tên vaccine",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "manufacturerName",
      key: "manufacturerName",
      responsive: ["md"],
    },
    {
      title: "Kháng nguyên",
      dataIndex: "antigen",
      key: "antigen",
      responsive: ["md"],
    },
    {
      title: "Phương thức đống gối",
      dataIndex: "packing",
      key: "packing",
      render: (packing) => `${packing} liều 1 lọ`,
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },

    {
      //operation
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết" color={"blue"}>
            <FontAwesomeIcon
              className="button-icon"
              style={{ fontSize: "20px" }}
              icon={faEye}
              onClick={() => {
                handleDetail(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Sửa" color={"blue"}>
            <FontAwesomeIcon
              className="button-icon"
              style={{ fontSize: "20px" }}
              icon={faPencil}
              onClick={() => {
                handleUpdate(record);
              }}
            />
          </Tooltip>
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
  //declair variable
  const [searchInfo,setSearchInfo]= useState("");
  const [manufacturerId,setManufacturerId]=useState("");
  const { Search } = Input;
  const [page, setPage] = React.useState(1);
  const [fileList, setFileList] = useState([]);
  const [listManufacturer, setListManufacturer] = useState([]);
  const [operation, setOperation] = useState("");
  const [response, setResponse] = useState();
  const [tableData, setTableData] = useState([]);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const formData = new FormData();
  const [imageUrl, setImageUrl] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [dataById, setDataById] = useState({
    id: "",
    name: "",
    manufacturer: "",
    antigen: "",
    packing: "",
    unit: "",
    description: "",
    origin: "",
    contraindicated: "",
    unwantedEffect: "",
    preserve: "",
    image: "",
  });
  useEffect(() => {
    getlistManufacturer();
  }, []);
  //function
  const searchVaccine = useMutation({
    mutationFn: (name) => {
      console.log(name)
      console.log("id "+ manufacturerId.toString())
      return axios({
        method: "get",
        url: "http://localhost:8080/API/Vaccine/Search",
        headers: {
           "Content-type": "application/json",
          Authorization: `Bearer ${getJwtToken()}`,
        },
        params:{
          name:name,
          manufacturerId:manufacturerId.toString()
        },
      }).then((response) => {
        console.log(response.data.data);
        setTableData(response.data.data);
      });
    },
    onSuccess: () => {
      setShowLoading(false);
    },
    onError: (error) => {
      setShowLoading(false);
      console.log(error)
      openNotification("Thất bại", error.response.data.message);
    },
  });
  const getJwtToken = () => {
    if (sessionStorage.getItem("jwtToken") !== null)
      return sessionStorage.getItem("jwtToken");
    if (Cookies.get("jwtToken") !== undefined) return Cookies.get("jwtToken");
  };
  const handleCancel = () => {
    setFile(null);
    setFileList([]);
    setOperation("");
  };

  function handleFileChange(e) {
    setFileList(e.fileList);
    if (e.fileList[0].originFileObj.name !== "") {
      setFile(e.fileList[0].originFileObj);
    }
  }
  const handleAdd = () => {
    setFile(null);
  
    form.resetFields();
    setFileList([]);
    setOperation("Add");
  };
  const handleUpdate = (record) => {
    setFile(null);
  
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      antigen: record.antigen,
      packing: record.packing,
      unit: record.unit,
      description: record.description,
      unwantedEffect: record.unwantedEffect,
      origin: record.origin,
      contraindicated: record.contraindicated,
      preserve: record.preserve,
      manufacturerId: record.manufacturerId,
    });
    setImageUrl(record.image);
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: record.image,
      },
    ]);
    setFile(fileList[0]);
    setOperation("Update");
  };
  const handleDetail = (record) => {
    const manufacturer = listManufacturer.find(
      (manufacturer) => manufacturer.id === record.manufacturerId
    );
    console.log(manufacturer.name);
    console.log(record);
    setDataById({
      id: record.id,
      name: record.name,
      manufacturer: manufacturer.name,
      antigen: record.antigen,
      packing: record.packing,
      unit: record.unit,
      description: record.description,
      origin: record.origin,
      contraindicated: record.contraindicated,
      unwantedEffect: record.unwantedEffect,
      preserve: record.preserve,
      image: record.image,
    });
    setOperation("Detail");
  };
  const handleDelete = (record) => {
    const manufacturer = listManufacturer.find(
      (manufacturer) => manufacturer.id === record.manufacturerId
    );
    console.log(manufacturer.name);
    console.log(record);
    setDataById({
      id: record.id,
      name: record.name,
      manufacturer: manufacturer.name,
      antigen: record.antigen,
      packing: record.packing,
      unit: record.unit,
      description: record.description,
      origin: record.origin,
      contraindicated: record.contraindicated,
      unwantedEffect: record.unwantedEffect,
      preserve: record.preserve,
      image: record.image,
    });
    setOperation("Delete");
  };
  function onFinish(values) {
    if (operation === "Add") {
      setShowLoading(true);
      addVaccine.mutate(values);
    }
    if (operation === "Update") {
      setShowLoading(true);
      console.log(fileList);
      updateVaccine.mutate(values);
    }
    if (operation === "Delete") {
      setShowLoading(true);
      deleteVaccine.mutate(dataById.id);
    }
  }
  const onFinishFailed = (errorInfo) => {
    openNotification("Thất bại", "Không thể thao tác");
  };
  const getlistManufacturer = () => {
    const name="";
    axios({
      method: "get",
      url: "http://localhost:8080/API/Manufacturer",
      headers: {
          "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getJwtToken()}`,
      },
      params:{name}
    }).then((response) => {
      setListManufacturer(response.data.data);
    });
  };
  //Effect
 
  //edit title
  let titleText;
  let titleStyle = {};

  if (operation === "Detail") {
    titleText = "Thông tin vắc xin";
    titleStyle = {
      fontSize: "24px",
      color: "orange",
      backgroundColor: "darkblue",
      fontWeight: "bold",
      borderRadius: "8px",
      paddingLeft: "10px",
     
    };
  } else if (operation === "Delete") {
    titleText = "Xóa vắc xin !!";
    titleStyle = {
      fontSize: "24px",
      color: "orange",
      backgroundColor: "darkblue",
      fontWeight: "bold",
      borderRadius: "8px",
      paddingLeft: "10px",
      marginTop: "20px",
    };
  } else {
    titleText = null;
  }
  //contraidicated
  const sentences = dataById.contraindicated
    .split(";")
    .filter((sentence) => sentence.trim() !== ""); // Split the text by period and remove empty sentences
  const listItems = sentences.map((sentence, index) => (
    <li key={index}>{sentence.trim()}</li>
  ));
  const sentences2 = dataById.unwantedEffect
    .split(";")
    .filter((sentence) => sentence.trim() !== ""); // Split the text by period and remove empty sentences
  const listItems1 = sentences2.map((sentence, index) => (
    <li key={index}>{sentence.trim()}</li>
  ));
  return (
    <App onChose={"Vaccine"}>
      {contextHolder}
      <h2 className="header">Quản lý vaccine</h2>
    
      <div className="center">
      <Row style={{marginLeft:"1%",
        width:"98%"
      }}>
          <Col span={6}>
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
          </Col>
          <Col span={2} style={{paddingLeft:"1%",textAlign:"center",paddingTop:"5px"}}>Nhà cung cấp</Col>
          <Col span={11} style={{paddingLeft:"1%"}}>
          <Select style={{width:"95%"}}
          onChange={(e)=>{
           
          setManufacturerId(e.toString())
          }}
          value={manufacturerId}
          >
             <Select.Option key={""} value={""}
            >
                      Tất cả
                    </Select.Option>
                  {listManufacturer.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                  
                </Select>
          </Col>
        <Col span={5} style={{textAlign:"right"}}> <Search
                allowClear={true}
                placeholder="Nhập tên vắc xin"
                onSearch={(name, _e, info) => {
                  console.log(info?.source, name);
                  if(info?.source =="clear"){
                    setManufacturerId("");
                  }
                  setSearchInfo(name)
                  console.log("id "+manufacturerId.toString())
                  setShowLoading(true);
                  searchVaccine.mutate(name);
                }}
              /></Col>
        </Row>
        <Table
             style={{ margin: "1%", border: "1px solid",  borderColor:"#A9A9A9",  }}
          loading={isLoading}
          columns={columns}
          dataSource={tableData}
          rowKey="id"
          pagination={{
            defaultPageSize: 8,
            position: ["bottomCenter"],
            onChange(current) {
              setPage(current);
            },
          }}
          // pagination={{

          // }}
        />
      </div>
      <Modal
        styles={{
          body: {
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
          },
        }}
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
        ? "Thêm vắc xin"
        : operation === "Update"
        ? "Sửa thông tin vắc xin"
        : null
    }
        </div>} 
        open={operation === "Add" || operation === "Update"}
        onCancel={handleCancel}
        footer={null}
        width={1200}
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
            maxWidth: 1200,
          }}
          form={form}
        >
          {operation !== "Add " ? (
            <Form.Item
              name="id"
              style={{
                display: "none", // Adjust width as needed
              }}
            ></Form.Item>
          ) : null}

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Tên vắc xin"
                name="name"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên vaccine",
                  },
                ]}
              >
                <Input name="name" maxLength="30" size="30" />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="Nhà cung cấp"
                labelCol={{ span: 6 }}
                name="manufacturerId"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn vai trò",
                  },
                ]}
              >
                <Select style={{ marginLeft: "-40px" }}>
                  {listManufacturer.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={9}>
              <Form.Item
                label="Kháng nguyên"
                name="antigen"
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
                <Input name="antigen" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                labelCol={{ span: 13 }}
                label="Phương thức đóng gói"
                name="packing"
                style={{
                  width: "100%", // Adjust width as needed
                }}
                wrapperCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập phương thức đống gối",
                  },
                ]}
              >
                <Input type="number" name="packing" maxLength="30" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                initialValue="Liều"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 20 }}
                label="Đơn vị"
                name="unit"
                style={{
                  width: "100%", // Adjust width as needed
                }}
              >
                <Input
                  name="unit"
                  maxLength="30"
                  size="30"
                
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Mô tả"
            name="description"
            style={{
              width: "80%", // Adjust width as needed
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng mô tả",
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              disabled={operation === "Delete"}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Nguồn gốc"
            name="origin"
            style={{
              width: "80%", // Adjust width as needed
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nguồn gốc",
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              disabled={operation === "Delete"}
              name="origin"
            />
          </Form.Item>
          <Form.Item
            label="Chống chỉ định"
            name="contraindicated"
            style={{
              width: "80%", // Adjust width as needed
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập chống chỉ định",
              },
            ]}
          >
            <Input.TextArea
              rows={4}
              disabled={operation === "Delete"}
              name="contraindicated"
            />
          </Form.Item>
          <Form.Item
            label="Tác dụng không mong muốn"
            name="unwantedEffect"
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
            <Input.TextArea
              rows={6}
              disabled={operation === "Delete"}
              name="unwantedEffect"
            />
          </Form.Item>
          <Form.Item
            label="Bảo quản"
            name="preserve"
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
            <Input.TextArea
              rows={6}
              disabled={operation === "Delete"}
              name="preserver"
            />
          </Form.Item>
          <Form.Item
            label="Tải ảnh"
            name="fileList"
            valuePropName=""
            rules={
              operation === "Add"
                ? [
                    {
                      required: true,
                      message: "Vui lòng chọn ảnh",
                    },
                  ]
                : []
            }
          >
            <Upload
              listType="picture-card"
              showUploadList={{
                showPreviewIcon: false,
              }}
              fileList={fileList}
              maxCount={1}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              {fileList.length === 0 && (
                <Button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </Button>
              )}
            </Upload>
          </Form.Item>
          <Form.Item label=" ">
            <div className="submit">
              <Button
                style={{ textAlign: "right" }}
                type="primary"
                htmlType="submit"
              >
                {operation === "Add" ? "Thêm" : null}
                {operation === "Update" ? "Sửa" : null}
              </Button>
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
      </Modal>
      <Modal
        closeIcon={null}
        styles={{
          body: {
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
          },
        }}
        title={<div style={titleStyle}>{titleText}</div>}
        open={operation === "Detail" || operation === "Delete"}
        onCancel={handleCancel}
        footer={null}
        width={1200}
      >
        <Row>
          <Col span={10} className="contentBody">
            Tên vắc xin: {dataById.name}
          </Col>
          <Col span={14} className="contentBody">
            Nhà cung cấp: {dataById.manufacturer}
          </Col>
         
        </Row>
        <Row>
          <Col span={10} className="contentBody">
            Kháng nguyên: {dataById.antigen}
          </Col>
          <Col span={12} className="contentBody">
            Phương thức đóng gói: {dataById.packing} {dataById.unit} 1 lọ
          </Col>
        </Row>
        <Row>
          <Col span={24} className="titleHeader">
            Mô tả
          </Col>
        </Row>
        <Row>
          <Col span={24} className="contentBody">
            {dataById.description}
          </Col>
        </Row>
        <Row>
          <Col span={24} className="titleHeader">
            Nguồn gốc
          </Col>
        </Row>
        <Row>
          <Col span={24} className="contentBody">
            {dataById.origin}
          </Col>
        </Row>
        <Row>
          <Col span={24} className="titleHeader">
            Chống chỉ định
          </Col>
        </Row>
        <Row>
          <Col span={24} className="contentBody">
            <ul>{listItems}</ul>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="titleHeader">
            Tác dụng không mong muốn
          </Col>
        </Row>
        <Row>
          <Col span={24} className="contentBody">
            <ul>{listItems1}</ul>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="titleHeader">
            Bảo quản
          </Col>
        </Row>
        <Row>
          <Col span={24} className="contentBody">
            {dataById.preserve}
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: "center",
            }}
          >
            <img alt="" src={dataById.image} style={{ width: "30%" }}></img>
          </Col>
        </Row>
        <Row>
          <Col
            span={12}
            style={{ color: "#ff0f0f", fontSize: "20px", fontWeight: "bold" }}
          >
            {operation === "Delete" ? "Bạn có muốn xóa vắc xin này !" : null}
          </Col>
          <Col
            span={12}
            style={{
              textAlign: "right",
            }}
          >
            {operation === "Delete" ? (
              <Button
                style={{ textAlign: "right" }}
                type="primary"
                onClick={onFinish}
              >
                Xóa
              </Button>
            ) : null}

            <Button
              style={{ textAlign: "right", marginLeft: "10px",color: "#4d79ff",
              fontWeight: "500",
              backgroundColor: "#f2f2f2", }}
              type="primary"
              onClick={handleCancel}
            >
              Quay lại
            </Button>
          </Col>
        </Row>
      </Modal>
      <LoadingModal showLoading={showLoading} />
    </App>
  );
}

export default Vaccine;
