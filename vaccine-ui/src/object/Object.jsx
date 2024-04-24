import axios, { Axios } from "axios";
import App from "../App";
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
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusOutlined } from '@ant-design/icons';
import { render } from "react-dom";
function Objects() {
    const [file,setFile]=useState();
    const formData = new FormData();
    function handleFileChange(e) {
        if (e.fileList[0].originFileObj.name !== ''){
         setFile(e.fileList[0].originFileObj);
        }
      }
      function submit(){
        console.log(file);
        formData.append('file',file)
        formData.append('name','khang')
        formData.append('packing','12')
        formData.append('unit','khang')
        formData.append('antigen','112')
        formData.append('description','khang')
        formData.append('origin','khang')
        formData.append('contraindicated','khang')
        formData.append('useWithCaution','khang')
        formData.append('unwantedEffect','khang')
        formData.append('preserve','khang')
        formData.append('manufacturerId','0056217d-0053-11ef-838d-30d04236bd1e')    
        axios.post("http://localhost:8080/API/Vaccine", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
      }).then((response) => console.log(response.data))
    }

    return ( 
        <App>
            <Upload listType="picture-card"maxCount={1} onChange={handleFileChange}  beforeUpload={() => false}>
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
          <button onClick={submit}>submit </button>
        </App>
     );
}

export default Objects;