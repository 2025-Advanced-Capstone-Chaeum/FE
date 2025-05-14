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
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsImVtYWlsIjoiZG9mbDg1NDlAbmF2ZXIuY29tIiwicm9sZSI6IkRPTk9SIiwiaWF0IjoxNzQ3MjE1Mjg4LCJleHAiOjE3NDcyMTg4ODh9.CxThGsWwn6TSx3LCuYdl9IoKGMaDB7wv4Zndm7ZFRRRqUUPtpoB193uil3DaAPAUy4nzpU9bBvneoEFKHYFRJQ",
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
  }, []);

  return <ClientWelcome />;
}
