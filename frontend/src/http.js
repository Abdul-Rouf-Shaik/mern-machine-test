import axios from "axios";

const http = axios.create({
  baseURL: "https://mern-machine-test-api-psi.vercel.app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to dynamically set the Content-Type
http.interceptors.request.use((config) => {
  // Check if the request data is FormData (for multipart form data)
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default http;
