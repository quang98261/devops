import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import apiService from "../../services/apiService.js"; // 👈 import default

export default function MenuAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: 0, imageUrl: "/images/logo.svg" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await apiService.menu.getAll(); // 👈 dùng apiService.menu
      setItems(res.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Không thể tải thực đơn");
    }
  };

  const handleAdd = async () => {
    try {
      await apiService.menu.add(form); // 👈 thêm món
      toast.success("Thêm món ăn thành công");
      setForm({ name: "", price: 0, imageUrl: "/images/logo.svg" });
      fetchItems();
    } catch (e) {
      console.error(e);
      toast.error("Thêm món ăn thất bại");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Quản lý thực đơn</h3>
      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Tên món"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Thêm món
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            {/* <th>Ảnh</th> */}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                {/* <img src={item.imageUrl} alt={item.name} style={{ maxWidth: "100px" }} /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
