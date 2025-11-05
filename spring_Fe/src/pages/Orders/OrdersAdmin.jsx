import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API || "http://localhost:8080";

export default function OrdersAdmin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    // ✅ Lấy tất cả orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/orders`);
            setOrders(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("❌ Lỗi khi tải đơn hàng:", error);
            toast.error("Không thể tải danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Xóa order theo id
    const handleDeleteOrder = async (id) => {
        try {
            console.log("Deleting order id:", id);
            await axios.delete(`${API_URL}/orders/${id}`);
            toast.success("Xóa đơn hàng thành công");
            fetchOrders(); // refresh danh sách
        } catch (error) {
            console.error("❌ Lỗi xóa đơn hàng:", error.response?.data || error);
            toast.error("Xóa đơn hàng thất bại");
        }
    };

    // ✅ Thanh toán order
    const handlePayOrder = async (id) => {
        try {
            console.log("Paying order id:", id);
            await axios.put(`${API_URL}/orders/${id}/pay`);
            toast.success("Thanh toán thành công");
            fetchOrders(); // refresh danh sách
        } catch (error) {
            console.error("❌ Lỗi thanh toán:", error.response?.data || error);
            toast.error("Thanh toán thất bại");
        }
    };

    return (
        <div className="container mt-4">
            <h3>📦 Danh sách đơn hàng</h3>
            {loading && <div>Đang tải dữ liệu...</div>}

            <table className="table table-bordered mt-2">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Bàn</th>
                    <th>Chi tiết món</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center">
                            Không có đơn hàng nào
                        </td>
                    </tr>
                ) : (
                    orders.map((o) => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.tableId}</td>
                            <td>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {o.items?.map((it, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                                border: "1px solid #eee",
                                                padding: 6,
                                                borderRadius: 6,
                                            }}
                                        >
                                            <div>
                                                {it.name} × {it.qty}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td>
                  <span
                      className={`badge ${
                          o.status === "PAID"
                              ? "bg-success"
                              : o.status === "SERVED"
                                  ? "bg-warning"
                                  : "bg-secondary"
                      }`}
                  >
                    {o.status}
                  </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => handleDeleteOrder(o.id)}
                                >
                                    Xóa
                                </button>
                                {o.status !== "PAID" && (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handlePayOrder(o.id)}
                                    >
                                        Thanh toán
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
