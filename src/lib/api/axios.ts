import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.chaeum.site",
  withCredentials: true, // <- HttpOnly 쿠키 전송
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwibWVtYmVySWQiOjYsInJvbGUiOiJET05PUiIsImlhdCI6MTc0OTA0MDUyMSwiZXhwIjoxNzQ5MDQ0MTIxfQ.vEsISppGiNzQh8IcsYp2XrtnIvitN0MyzxCUJPPBat2ppJ4RBAaZUNiASbHU0lHnhxlG1VVz4qEbdeqg4MP3OA",
  },
});

export default axiosInstance;
