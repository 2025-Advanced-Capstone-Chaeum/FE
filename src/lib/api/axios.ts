import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjgsInJvbGUiOiJSRUNJUElFTlQiLCJpYXQiOjE3NDg2MjgyNTAsImV4cCI6MTc0ODYzMTg1MH0.5wmkTe55NSr8BityMT-cz7U40yVuIbAF8HVtZCecsSXU1ox4vxnsbsiF00xsTER2NCJLvHH_pdBu53V_K4YwLw",
  },
});

export default axiosInstance;
