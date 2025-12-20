import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

export const apiFormData = axios.create({
  baseURL: BASE_URL,
});

export default api;