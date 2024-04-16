import React from 'react'
import App from '../App'
import './Home.css'
const Home = () => {
  return (
    <App>
       <div className="homepage-container">
      <div className="feature-section">
        <h2>Chào mừng đến với trang chủ tiêm chủng</h2>
        <p>
          Với website tiêm chủng tại phường bạn có thể quản lý nhiều chức năng
        </p>
        {/* Add more feature sections here */}
      </div>

      <div className="feature-section">
      <div className="function-list">
      <h2>Danh sách chức năng</h2>
      <ul>
        <li>Quản lý đối tượng</li>
        <li>Quản lý kế hoạch tiêm chủng</li>
        <li>Quản lý các mũi tiêm chủng</li>
        <li>Quản lý kế hoạch tiêm chủng</li>
        <li>Quản lý nhập xuất vaccine</li>
        <li>Quản lý nhà cung cấp</li>
        <li>Quản lý nhân viên</li>
        <li>Quản lý loại viên</li>
        <li>Thống kê báo cáo</li>
      </ul>
    </div>
      </div>

      {/* Add more feature sections here */}

    </div>
    </App>
  )
}

export default Home;