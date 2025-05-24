import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjcsInJvbGUiOiJET05PUiIsImlhdCI6MTc0ODA3MzUyOSwiZXhwIjoxNzQ4MDc3MTI5fQ.BS3vz6nNRMeAJuBpkUftSBX9BaISq1cdObFLQEEncWov7E_F3m_hT0-amQJBW7OPbUZh-EYV-udL-JhWJoTl6A`,
  },
});

export default axiosInstance;
