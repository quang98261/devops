import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ---- MENU ----
export const menuApi = {
  getAll: () => api.get("/menu"),
  add: (menu) => api.post("/menu", menu),
  update: (id, menu) => api.put(`/menu/${id}`, menu),
  delete: (id) => api.delete(`/menu/${id}`),
};

// ---- TABLES ----
export const tableApi = {
  getAll: () => api.get("/tables"),
  add: (table) => api.post("/tables", table),
  checkout: (id, payload) => api.put(`/tables/${id}/checkout`, payload),
};

// ---- BOOKINGS ----
export const bookingApi = {
  getAll: () => api.get("/orders"),
  create: (booking) => api.post("/orders", booking),
  update: (id, booking) => api.put(`/orders/${id}`, booking),
  cancel: (id) => api.delete(`/orders/${id}`),
};


// ---- ORDERS ----
export const orderApi = {
  getAll: () => api.get("/orders"),
  create: (order) => api.post("/orders", order),
  update: (id, order) => api.put(`/orders/${id}`, order),
  delete: (id) => api.delete(`/orders/${id}`),
};

// ---- REPORTS ----
export const reportApi = {
  getDaily: () => api.get("/reports/daily"),
  getAll: () => api.get("/reports"),
};

// ---- AUTH ----
export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login: (credentials) => api.post("/auth/login", credentials),
};

// ---- USERS ----
export const userApi = {
  getAll: () => api.get("/users"),
  add: (user) => api.post("/users", user),
  update: (id, user) => api.put(`/users/${id}`, user),
  delete: (id) => api.delete(`/users/${id}`),
};

// ---- COMPANIES ----
export const companyApi = {
  getAll: () => api.get("/companies"),
  add: (company) => api.post("/companies", company),
  update: (id, company) => api.put(`/companies/${id}`, company),
  delete: (id) => api.delete(`/companies/${id}`),
};

// ---- EXPORT GỘP ----
export default {
  menu: menuApi,
  tables: tableApi,
  bookings: bookingApi,
  orders: orderApi,
  reports: reportApi,
  auth: authApi,
  users: userApi,
  companies: companyApi,
};



export const useAuth = {
  getAll: () => api.get("/tables"),
  add: (table) => api.post("/tables", table),
  checkout: (id, payload) => api.put(`/tables/${id}/checkout`, payload),
};
