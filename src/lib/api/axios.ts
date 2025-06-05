import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjIsInJvbGUiOiJET05PUiIsImlhdCI6MTc0OTE0NjA4NywiZXhwIjoxNzQ5MTQ5Njg3fQ.rl-tjGAzFkg2BseeCfrWWRUXsByx4wgWrhZhiCqiNPXtxR9YQ1-65qbRvgAklYF-amoyZjZHmfiXrnXaeoweMQ",
  },
});

export default axiosInstance;
