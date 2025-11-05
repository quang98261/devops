import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PublicRoute from "./routes/PublicRoute";
import Register from "./auth/register/Register";
import HomePage from "./pages/Home/HomePage";
import Layout from "./components/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./auth/login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import MenuAdmin from "./pages/Menu/MenuAdmin";
import TablesAdmin from "./pages/Tables/TablesAdmin";
import TableBooking from "./pages/Booking/TableBooking";
import OrdersAdmin from "./pages/Orders/OrdersAdmin";
import RevenueAdmin from "./pages/Reports/ReportsAdmin.jsx";
// import ReportsAdmin from "./pages/Reports/ReportsAdmin";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<MenuAdmin />} />
          <Route path="/admin/tables" element={<TablesAdmin />} />
          <Route path="/booking" element={<TableBooking />} />
          <Route path="/admin/orders" element={<OrdersAdmin />} />
           <Route path="/reports" element={<RevenueAdmin />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
