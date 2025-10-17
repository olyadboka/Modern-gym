import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored auth data on unauthorized
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials) => api.post("/users/login", credentials),
  register: (userData) => api.post("/users/register", userData),
  logout: () => api.post("/users/logout"),
  getProfile: () => api.get("/users/profile"),
  updateProfile: (userData) => api.put("/users/profile", userData),
};

export const userAPI = {
  getAllUsers: (params) => api.get("/users", { params }),
  updateUserStatus: (userId, status) =>
    api.put(`/users/${userId}/status`, { isActive: status }),
  deleteUser: (userId) => api.delete(`/users/${userId}`),
};

export const trainerAPI = {
  getTrainers: (params) => api.get("/trainers", { params }),
  getTrainer: (id) => api.get(`/trainers/${id}`),
  createTrainer: (data) => api.post("/trainers", data),
  updateTrainer: (id, data) => api.put(`/trainers/${id}`, data),
  deleteTrainer: (id) => api.delete(`/trainers/${id}`),
};

export const serviceAPI = {
  getServices: (params) => api.get("/services", { params }),
  getService: (id) => api.get(`/services/${id}`),
  createService: (data) => api.post("/services", data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
};

export const membershipAPI = {
  getMemberships: (params) => api.get("/memberships", { params }),
  getMembership: (id) => api.get(`/memberships/${id}`),
  createMembership: (data) => api.post("/memberships", data),
  updateMembership: (id, data) => api.put(`/memberships/${id}`, data),
  deleteMembership: (id) => api.delete(`/memberships/${id}`),
};

export const scheduleAPI = {
  getSchedules: (params) => api.get("/schedules", { params }),
  getSchedule: (id) => api.get(`/schedules/${id}`),
  createSchedule: (data) => api.post("/schedules", data),
  updateSchedule: (id, data) => api.put(`/schedules/${id}`, data),
  deleteSchedule: (id) => api.delete(`/schedules/${id}`),
};

export const bookingAPI = {
  getBookings: (params) => api.get("/bookings", { params }),
  getBooking: (id) => api.get(`/bookings/${id}`),
  createBooking: (data) => api.post("/bookings", data),
  updateBooking: (id, data) => api.put(`/bookings/${id}`, data),
  deleteBooking: (id) => api.delete(`/bookings/${id}`),
  getUserBookings: () => api.get("/bookings/my-bookings"),
};

export const contactAPI = {
  getContacts: (params) => api.get("/contacts", { params }),
  getContact: (id) => api.get(`/contacts/${id}`),
  createContact: (data) => api.post("/contacts", data),
  updateContact: (id, data) => api.put(`/contacts/${id}/status`, data),
  deleteContact: (id) => api.delete(`/contacts/${id}`),
};

export default api;
