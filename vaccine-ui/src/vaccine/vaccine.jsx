import App from "../App";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
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
        .get("http://localhost:8080/API/Vaccine")
        .then((res) => res.data.data),
    onError: () => {
      openNotification("Thất bại", "Không có dữ liệu");
    },
  });
  const addVaccine = useMutation({
    mutationFn: (values) => {
      console.log(values)
      formData.append('file', file);
      formData.append('name', values.name);
      formData.append('antigen', values.antigen);
      formData.append('packing', values.packing); // Assuming packing is a number
      formData.append('unit', values.unit);
      formData.append('description', values.description);
      formData.append('origin', values.origin);
      formData.append('contraindicated', values.contraindicated);
      formData.append('effect', values.unwantedEffect);
      formData.append('preserve', values.preserve);
      formData.append('manufacturerId', values.manufacturerId);
      return axios
        .post("http://localhost:8080/API/Vaccine", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => console.log(response.data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoVaccine"] });
      openNotification("Thành công", "Đã thêm vào danh sách");
    },
    onError: (error) => {
      openNotification("Thất bại", error.response.data.message);
      console.log(error.response);
    },
  });
  const deleteVaccine = useMutation({
    mutationFn: (id) => {
      return axios({
        method: "delete",
        url: "http://localhost:8080/API/Vaccine",
        headers: {
          "Content-type": "application/json",
        },
        params: {
          id,
        },
      }).then((response) => setResponse(response.data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoVaccine"] });
      openNotification("Thành công", "Xóa thành công");
    },
    onError: (error) => {
      openNotification("Thất bại", "Không thể xóa");
    },
  });
  const columns = [
    {
      title: "Tên vaccine",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "manufacturerName",
      key: "manufacturerName",
    },
    {
      title: "Kháng nguyên",
      dataIndex: "antigen",
      key: "antigen",
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
            <Button
              // onClick={() => {
              // }}
            >
              <img className="operation" src="/public/assets/detail.png"></img>
            </Button>
          </Tooltip>
          <Tooltip title="Sửa" color={"blue"}>
            <Button
              onClick={() => {
                handleUpdate(record);
              }}
            >
              <img className="operation" src="/public/assets/update.png"></img>
            </Button>
          </Tooltip>
          <Tooltip title="Xóa" color={"blue"}>
            <Button
              onClick={() => {
                handleDelete(record);
              }}
            >
              <img className="operation" src="/public/assets/delete.png"></img>
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  //declair variable
  const [fileList, setFileList] = useState([]);
  const [listManufacturer, setListManufacturer] = useState([]);
  const [operation, setOperation] = useState("");
  const [response, setResponse] = useState();
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const formData = new FormData();
  const [imageUrl,setImageUrl]= useState("");

  //function
  const handleCancel = () => {
    setFileList([])
    setOperation("");
  };
  const handleDelete = (record) => {

    deleteVaccine.mutate(record.id);
  };
  function handleFileChange(e) {
    setFileList(e.fileList)
    if (e.fileList[0].originFileObj.name !== "") {
      setFile(e.fileList[0].originFileObj);
    }
  }
  const handleAdd = () => {
    getlistManufacturer();
    form.resetFields();
    setOperation("Add");
  };
  const handleUpdate = (record) => {
    getlistManufacturer();
    console.log(record)
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      antigen: record.antigen,
      packing: record.packing,
      unit: record.unit,
      description: record.description,
      unwantedEffect:record.unwantedEffect,
      origin: record.origin,
      contraindicated: record.contraindicated,
      preserve:record.preserve,
      manufacturerId: record.manufacturerId,
    });
      setImageUrl(record.image)
      setFileList([{
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: record.image,
    },])
    setOperation("Update");
  };
  function onFinish(values) {
    console.log(values);
    console.log(values.antigen);
    if (operation === "Add") {
      addVaccine.mutate(values);
    }
    if (operation === "Update") {
      console.log(values);
      setImageUrl("");
      setFileList([])
    }
    if (operation === "Delete") {
    
    }
     setFileList([])
     setOperation("");
  }
  const onFinishFailed = (errorInfo) => {
    openNotification("Thất bại", "Không thể thêm");
  };
  const getlistManufacturer = () => {
    axios({
      method: "get",
      url: "http://localhost:8080/API/Manufacturer",
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      setListManufacturer(response.data.data);
    });
  };

  return (
    <App>
      {contextHolder}
      <h2 className="header">Quản lý vaccine</h2>
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
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{
            defaultPageSize: 5,
            position: ["bottomCenter"],
          }}
        />
      </div>
      <Modal
        styles={{
          body: {
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
          },
        }}
        title={
          operation === "Add"
            ? "Thêm vắc xin"
            : operation === "Update"
            ? "Sửa thông tin vắc xin"
            : operation === "Detail"
            ? "Xem thôn tin vắc xin"
            : "Xóa vắc xin"
        }
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
          {operation === "Add "? <Form.Item
                name="id"
                style={{
                 display:"none" // Adjust width as needed
                }} 
              >
              </Form.Item>: null}
          
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
            <Col span={8}>
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
                <Input name="antigen"  />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                labelCol={{ span: 12 }}
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
            <Col span={8}>
              <Form.Item
                initialValue="liều"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                label="Đơn vị"
                name="unit"
                style={{
                  width: "100%", // Adjust width as needed
                }}
              >
                <Input
                  readOnly
                  name="unit"
                  maxLength="30"
                  size="30"
                  style={{ width: "20%" }}
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
                message: "Vui lòng nhập địa chỉ",
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
                message: "Vui lòng nhập địa chỉ",
              },
            ]}
          >
            <Input.TextArea
              rows={2}
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
                message: "Vui lòng nhập địa chỉ",
              },
            ]}
          >
            <Input.TextArea
              rows={2}
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
          <Form.Item label="Tải ảnh"
            name="fileList"
            valuePropName=""
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ảnh",
              },
            ]}
          >
            <Upload
              listType="picture-card"
              showUploadList={{
                showPreviewIcon:false
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
                {operation === "Delete" ? "Xóa" : null}
                {operation === "Update" ? "Sửa" : null}
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
    </App>
  );
}

export default Vaccine;
