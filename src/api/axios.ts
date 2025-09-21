import axios from "axios";

const api = axios.create({
  baseURL: "https://api.lmsplatform.co.tz", // 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;