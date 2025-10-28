import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);
      toast.success(res.data?.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || err.response?.data || "Registration failed!";
      toast.error(msg);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {["name", "email", "phone", "address", "password"].map((field) => (
          <div key={field} className="mb-3">
            <label className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={field !== "address"}
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
