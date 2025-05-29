import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization:
      " Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjgsInJvbGUiOiJET05PUiIsImlhdCI6MTc0ODQ5MjI4NSwiZXhwIjoxNzQ4NDk1ODg1fQ.ktBRVJF73BYH1Oyc7JbyLs_dExrFF3XK7I7T0eUb8Wwu0fERRCOwWzr_CCQ5NGvc1JUEKGO7U5YMs4NxpR6dlQ",
  },
});

export default axiosInstance;
