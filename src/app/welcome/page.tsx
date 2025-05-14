"use client";

import ClientWelcome from "@/components/welcome/ClientWelcome";
import axiosInstance from "@/lib/api/axios";
import { userStore } from "@/store/userStore";
import { useEffect } from "react";

export default function WelcomePage() {
  const setUserData = userStore((state) => state.setUserData);
  const fetchMemberInfo = async () => {
    const response = await axiosInstance.get("/api/v1/member", {
      withCredentials: true, // HttpOnly 쿠키를 전송하려면 필수
      headers: {
        Authorization:
          " Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwicm9sZSI6IkRPTk9SIiwiaWF0IjoxNzQ3MjMzMzAyLCJleHAiOjE3NDcyMzY5MDJ9.J8C2ymBfQhW3fErRSRP4XZwAxU91i8NyUM-xXOgB0WK4j3SvkpesW9es7DgBsiVW0tGYxn533TB5aHcb6Uf4mg",
      },
    });
    return response.data;
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await fetchMemberInfo();
        setUserData(data);
      } catch (err) {
        console.error("회원 정보 요청 실패:", err);
      }
    };

    getUser();
  }, [setUserData]);

  return <ClientWelcome />;
}
