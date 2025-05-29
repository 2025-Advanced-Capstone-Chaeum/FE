import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization:
      " Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjgsInJvbGUiOiJET05PUiIsImlhdCI6MTc0ODQ4NjU1NCwiZXhwIjoxNzQ4NDkwMTU0fQ.yCJ8ALdiUDNWKc6xmvSNKue8ptYP6k5SVyCTXULwMUkbo7qG6-aOqTtFo1zagJ3y22RK-25kJMRgPZQeY1XxvQ",
  },
});

export default axiosInstance;
