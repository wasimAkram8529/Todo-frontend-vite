import axios from "axios";

const API_URL = window.__CONFIG__?.API_URL
const api = axios.create({
  baseURL: API_URL
});

// console.log(api)
export default api;
