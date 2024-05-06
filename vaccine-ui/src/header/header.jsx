import {
    Row,
    Col,
    Space,
    Dropdown
  } from "antd";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { 
    faCircleUser,
  } from '@fortawesome/free-solid-svg-icons';
function HeaderPage() {
    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ];
    return ( 
            <Row>
                <Col span={24} >
                    <div style={{textAlign:"right",backgroundColor:"#001529",paddingRight:"1%"}}>
                    <Space >
                    <Dropdown
                            menu={{
                            items,
                            }}
                            placement="bottomLeft"
                            arrow
                        >
                             <div style={{ display: 'flex', alignItems: 'center', color: 'white', cursor: 'pointer' }}>
                            <span style={{  padding: '3px', marginRight: '3px' }}>Trần Vỹ Khang</span>
                            <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "30px", marginRight: '5px' }} />
                            </div>
                        </Dropdown>
                     </Space>
                    </div>
                    
                     </Col>
            </Row>
     );
}

export default HeaderPage;