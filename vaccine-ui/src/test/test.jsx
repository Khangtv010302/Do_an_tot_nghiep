import React from 'react';
import { Checkbox, Col, Row } from 'antd';
const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};
function Test() {
    const vaccines = [
        {
          name: 'AstraZeneca',
          month: 'January',
          dose: 1,
        },
        {
          name: 'Pfizer',
          month: 'February',
          dose: 1,
        },
        {
          name: 'AstraZeneca',
          month: 'March',
          dose: 2,
        },
      ];
      const columns = [
        {
          title: 'Tên Vaccine',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Tháng Tiêm Chủng',
          dataIndex: 'months',
          key: 'months',
        },
      ];
      const uniqueVaccines = Array.from(new Set(vaccines.map(vaccine => vaccine.name)));

  // Tạo mảng dữ liệu mới
        const newData = uniqueVaccines.map(name => {
            const months = vaccines.filter(vaccine => vaccine.name === name).map(vaccine => vaccine.month);
            return {
            name: name,
            months: months.join(', '), // Chuyển danh sách các tháng thành một chuỗi
            };
        });
    return (<Checkbox.Group
      style={{
        width: '100%',
      }}
      onChange={onChange}
    >
      <Row>
        <Col span={8}>
          <Checkbox value="A">A</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="B">B</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="C">C</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="D">D</Checkbox>
        </Col>
        <Col span={8}>
          <Checkbox value="E">E</Checkbox>
        </Col>
      </Row>
    </Checkbox.Group>  );
    
}

export default Test;