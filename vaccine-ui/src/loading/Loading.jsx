import {
    Modal,
  } from "antd";
import "./Loading.css"
function LoadingModal({showLoading}) {
    return (
        <Modal zIndex={1200} width={"150px"} open={showLoading} closeIcon={null}   footer={null} textAlign={"center"} centered maskClosable={false}
          modalRender={() => (
            <div style={{ textAlign: 'center' }}>
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>Đang tải...</div>
          </div>
        )}
        >
        </Modal>
      );
}

export default LoadingModal;