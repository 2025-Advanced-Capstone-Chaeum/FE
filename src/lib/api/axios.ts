import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjcsInJvbGUiOiJET05PUiIsImlhdCI6MTc0ODI3Njg0MiwiZXhwIjoxNzQ4MjgwNDQyfQ.xaP1uH2j50geMBPRgXSX3IcTu42e_79CYdugyaxjn_i9exGm1xb0VQyVBVDGPlf9HH1E2ezFc0riTxoYU56qlQ`,
  },
});

export default axiosInstance;
