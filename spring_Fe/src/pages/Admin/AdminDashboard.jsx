import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/admin/menu" className="btn btn-outline-primary mb-2 w-100">
            🍽️ Menu Management
          </Link>
        </li>
        <li>
          <Link to="/admin/tables" className="btn btn-outline-primary mb-2 w-100">
            🪑 Table Management
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="btn btn-outline-primary mb-2 w-100">
            📦 Orders
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default AdminDashboard;
