import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1"
});

// console.log(api)
export default api;
