import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjgsInJvbGUiOiJSRUNJUElFTlQiLCJpYXQiOjE3NDg2MjQ0NDEsImV4cCI6MTc0ODYyODA0MX0.rdqYmHztTMgCUokUdElQQfzBz8-GqCjmM4BSs30OdnH5d7ydLYU99YJZ8kE6ZY6bwc1RVy0Hwn6WRFgcBz58Sg",
  },
});

export default axiosInstance;
