import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/apiService.js';

export default function TablesAdmin() {
  const [tables, setTables] = useState([]);
  const [form, setForm] = useState({ number: '', status: 'EMPTY' });

  // Lấy danh sách bàn khi load trang
  useEffect(() => { fetchTables(); }, []);

  const fetchTables = async () => {
    try {
      const res = await api.tables.getAll();
      setTables(res.data || []);
    } catch (e) {
      console.error(e);
      toast.error('Lỗi khi tải danh sách bàn');
    }
  };

  const handleAdd = async () => {
    if (!form.number.trim()) return toast.error('Vui lòng nhập số bàn');
    try {
      await api.tables.add(form);
      toast.success('Thêm bàn thành công');
      setForm({ number: '', status: 'EMPTY' });
      fetchTables();
    } catch (e) {
      toast.error('Thêm bàn thất bại');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Quản lý bàn</h3>

      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Số bàn"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        />
        <select
          className="form-control mb-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="EMPTY">Trống</option>
          <option value="OCCUPIED">Đang sử dụng</option>
          <option value="PAID">Đã thanh toán</option>
        </select>
        <button className="btn btn-primary">
          Thêm bàn
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Số bàn</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.number}</td>
              <td>{t.status === 'EMPTY' ? 'Trống' : t.status === 'OCCUPIED' ? 'Đang sử dụng' : 'Đã thanh toán'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
