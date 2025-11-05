import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function RevenueAdmin() {
    const [items, setItems] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:8080/api/orders");

            if (Array.isArray(res.data)) {
                // ✅ Gom nhóm sản phẩm theo tên
                const map = new Map();

                res.data.forEach((order) => {
                    if (order.items && Array.isArray(order.items)) {
                        order.items.forEach((item) => {
                            const existing = map.get(item.name) || {
                                name: item.name,
                                qty: 0,
                                total: 0,
                            };
                            existing.qty += item.qty;
                            existing.total += item.qty * item.price;
                            map.set(item.name, existing);
                        });
                    }
                });

                const merged = Array.from(map.values());
                const total = merged.reduce((sum, i) => sum + i.total, 0);

                setItems(merged);
                setTotalRevenue(total);
            } else {
                toast.error("Dữ liệu trả về không hợp lệ");
            }
        } catch (e) {
            console.error(e);
            toast.error("Không thể tải dữ liệu đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📦 Thống kê sản phẩm đã bán</h2>

            {loading ? (
                <div>⏳ Đang tải dữ liệu...</div>
            ) : (
                <>
                    <div className="overflow-x-auto border rounded-lg shadow-sm">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2 text-left">Tên sản phẩm</th>
                                <th className="border px-4 py-2 text-right">Số lượng đã bán</th>
                                <th className="border px-4 py-2 text-right">Tổng giá (VND)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center p-4 text-gray-500"
                                    >
                                        Không có dữ liệu
                                    </td>
                                </tr>
                            ) : (
                                items.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{item.name}</td>
                                        <td className="border px-4 py-2 text-right">
                                            {item.qty}
                                        </td>
                                        <td className="border px-4 py-2 text-right">
                                            {item.total.toLocaleString()} ₫
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Tổng doanh thu */}
                    <div className="mt-5 text-right">
                        <h4 className="text-lg font-semibold">
                            💰 Tổng doanh thu toàn bộ:{" "}
                            <span className="text-green-600">
                                {totalRevenue.toLocaleString()} VND
                            </span>
                        </h4>
                    </div>
                </>
            )}
        </div>
    );
}
