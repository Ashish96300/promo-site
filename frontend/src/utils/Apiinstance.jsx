import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://promo-site.onrender.com/api/v1";
const api = axios.create({
  baseURL: BASE_URL,
});

export const apiFormData = axios.create({
  baseURL: BASE_URL,
});

export default api;