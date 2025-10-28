import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "60px",
      }}
    >
      <h1>☕ Quản Lý Quán Cafe</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Chào mừng đến hệ thống quản lý quán cafe!
      </p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/admin" className="btn btn-outline-primary m-2">
          Trang Quản Trị
        </Link>
        <Link to="/booking" className="btn btn-outline-success m-2">
          Đặt Bàn / Gọi Món
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
