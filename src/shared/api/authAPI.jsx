import axios from "axios";

/* Auth Instance */
export const authAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

authAPI.defaults.withCredentials = true;
authAPI.defaults.headers.post["Content-Type"] = "application/json";
