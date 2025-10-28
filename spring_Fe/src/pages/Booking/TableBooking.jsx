import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API || "http://localhost:8080";

function TableBooking() {
  const [tables, setTables] = useState([]);
  const [menu, setMenu] = useState([]); // Danh sách món
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // Món đã chọn
  const [bookingDate, setBookingDate] = useState(new Date().toISOString().slice(0, 10));
  const [bookingTime, setBookingTime] = useState("");
  const [bookingPartySize, setBookingPartySize] = useState(2);

  useEffect(() => {
    fetchTables();
    fetchMenu();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${API_URL}/tables`);
      setTables(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi tải danh sách bàn:", error);
      toast.error("Không thể tải danh sách bàn");
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API_URL}/menu`);
      setMenu(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi tải menu:", error);
      toast.error("Không thể tải menu");
    }
  };

  const handleTableSelect = (table) => setSelectedTable(table);

  const handleSelectItem = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id); // Bỏ chọn
      } else {
        return [...prev, item]; // Thêm món
      }
    });
  };

  const handleBooking = async () => {
    if (!selectedTable) {
      toast.error("Vui lòng chọn bàn trước");
      return;
    }
    if (selectedItems.length === 0) {
      toast.error("Vui lòng chọn ít nhất một món ăn");
      return;
    }

    const payload = {
      tableId: selectedTable.id,
      status: "NEW",
      total: selectedItems.reduce((sum, item) => sum + Number(item.price), 0),
      items: selectedItems.map(item => ({
        id: null, // Bỏ id cũ
        name: item.name,
        qty: 1,
        price: Number(item.price)
      }))
    };

    console.log("💾 Payload gửi lên backend:", payload);

    try {
      await axios.post(`${API_URL}/orders`, payload);
      toast.success("Đặt bàn và chọn món thành công!");
      setSelectedTable(null);
      setSelectedItems([]);
      setBookingDate(new Date().toISOString().slice(0, 10));
      setBookingTime("");
      setBookingPartySize(2);
      fetchTables();
    } catch (error) {
      console.error("❌ Lỗi đặt bàn:", error.response?.data || error);
      toast.error("Đặt bàn thất bại");
    }
  };

  return (
    <div className="container mt-4">
      <h3>🍴 Đặt Bàn & Chọn Món</h3>
      <div className="row">
        {/* Danh sách bàn */}
        <div className="col-md-4">
          <h5>Danh sách bàn</h5>
          {tables.length === 0 ? (
            <p>Không có bàn nào</p>
          ) : (
            <ul className="list-group">
              {tables.map((table) => (
                <li
                  key={table.id}
                  className={`list-group-item ${
                    table.status !== "EMPTY" ? "list-group-item-secondary" : ""
                  } ${selectedTable?.id === table.id ? "active" : ""}`}
                  onClick={() => handleTableSelect(table)}
                  style={{ cursor: "pointer" }}
                >
                  Bàn {table.number} — {table.status === "EMPTY" ? "Trống" : table.status === "OCCUPIED" ? "Đang sử dụng" : "Đã thanh toán"}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Thực đơn */}
        <div className="col-md-4">
          <h5>Thực đơn</h5>
          {menu.length === 0 ? (
            <p>Không có món nào</p>
          ) : (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {menu.map((item) => (
                <div
                  key={item.id}
                  className={`card mb-2 ${
                    selectedItems.find((i) => i.id === item.id) ? "border-success" : ""
                  }`}
                  onClick={() => handleSelectItem(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body d-flex align-items-center">
                    <div>
                      <h6>{item.name}</h6>
                      <p className="mb-0">{item.price}₫</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin đặt bàn */}
        <div className="col-md-4">
          <h5>Thông tin đặt bàn</h5>
          <div className="form-group mb-2">
            <label htmlFor="bookingDate">Ngày đặt</label>
            <input
              type="date"
              className="form-control"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="bookingTime">Giờ đặt</label>
            <input
              type="time"
              className="form-control"
              id="bookingTime"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="bookingPartySize">Số lượng khách</label>
            <input
              type="number"
              className="form-control"
              id="bookingPartySize"
              min="1"
              value={bookingPartySize}
              onChange={(e) => setBookingPartySize(e.target.value)}
            />
          </div>

          <h6 className="mt-3">Món đã chọn:</h6>
          {selectedItems.length === 0 ? (
            <p>Chưa chọn món nào</p>
          ) : (
            <ul>
              {selectedItems.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}

          <button className="btn btn-success mt-3 w-100" onClick={handleBooking}>
            Đặt bàn
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableBooking;
