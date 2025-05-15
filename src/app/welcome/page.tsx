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
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwicm9sZSI6IkRPTk9SIiwiaWF0IjoxNzQ3MzIxNDIxLCJleHAiOjE3NDczMjUwMjF9.HpXf4cpZPpp8g8Z4y_fY-NK52lclLS0aPluR5rdGYc7j1-yAnplj5gW2U9Qrpqe2tqeHSxzqEczl8hQqeB11cg",
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
