import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoicXdlcmU0NTg1QG5hdmVyLmNvbSIsIm1lbWJlcklkIjo2LCJyb2xlIjoiRE9OT1IiLCJpYXQiOjE3NDk3MjYzMzcsImV4cCI6MTc0OTcyOTkzN30.oroY8JAPu6cV8pgoVa9Gq4x6U9NW1nSR-FGmOIXjlFbMXZD5tTs1VOdHzwTaJ5ygEh4nVeCD95Mh0dLYo35syg`
  }
});

export default axiosInstance;
