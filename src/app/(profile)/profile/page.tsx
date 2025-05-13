"use client";

import { FaCirclePlus } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PaymentCard from "@/components/profile/PaymentCard";
import { myDonationList } from "@/lib/myDonationList";
import MyDonationList from "@/components/profile/MyDonationList";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export default function DonatorProfilePage() {
  const userData = userStore((state) => state.userData);
  const setUserData = userStore((state) => state.setUserData);
  const router = useRouter();
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = React.useState<string>("");
  const [name, setName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate: UploadImage, isPending } = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("multipartFile", file); //
      const uploadResponse = await axiosInstance.post(
        "/api/v1/file/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("이미지 업로드 성공:", uploadResponse.data);
      const uploadname = name === "" ? name : userData?.name;
      const imageUrl = uploadResponse.data?.data?.[0]?.fileUrl;
      // 이후 imageUrl을 가지고 회원 정보 업데이트
      const patchResponse = await axiosInstance.patch(
        "/api/v1/member",
        {
          name: uploadname,
          profileImage: imageUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("회원 정보 업데이트 성공:", patchResponse.data);
    },
    onError: (error: any) => {
      console.error("업로드 에러:", error);
      setErrorMessage("파일 업로드에 실패했습니다. 다시 시도 해주세요.");
    },
    onSuccess: () => {
      setErrorMessage("");
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (_: React.ChangeEvent<HTMLInputElement>) => {
    const file = _.target.files?.[0];
    if (file) {
      // 1. 로컬 preview 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result); // 따로 preview 상태에 저장
          setUserData({
            ...userData!,
            name,
            profileImage: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);

      // 2. 서버 업로드
      setSelectedFile(file);
    }
  };
  const handleNameChange = (_: React.ChangeEvent<HTMLInputElement>) => {
    setName(_.target.value);
  };
  const handleConfirm = () => {
    if (selectedFile) {
      UploadImage(selectedFile);
    }
    setIsOpen(false);
  };

  // Trailing Edge Debouncing
  const debounce = (delay: number): void => {
    if (timerIdRef.current) {
      // 할당되어 있는 timerId에 해당하는 타이머 제거
      clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = setTimeout(() => {
      // timerId에 새로운 타이머 할당
      console.log(`마지막 요청으로부터 ${delay}ms지났으므로 API요청 실행!`);
      timerIdRef.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => {
      // 페이지 이동 시 실행
      if (timerIdRef.current) {
        // 메모리 누수 방지
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);
  if (!userData) {
    return <div>페이지 정보를 불러오는 중입니다.</div>;
  }
  return (
    <>
      <div className="flex pl-6">
        <Link href={"/profile/recipient/register"}>
          <Button
            variant="ghost"
            className="w-33 h-9 rounded-2xl text-base text-secondary opacity-80 mt-8 ">
            수혜자 등록
          </Button>
        </Link>
      </div>

      <div className="flex flex-col px-4 max-h-[90vh] overflow-y-scroll scrollbar-none">
        <div className="flex flex-col justify-center items-center p-2">
          <div className="cursor-pointer">
            <Image
              width={100}
              height={130}
              src={
                preview ||
                (userData.profileImage && userData.profileImage !== "null"
                  ? userData.profileImage
                  : "/assets/icons/woman-profile.png")
              }
              alt="프로필"
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-baseline text-secondary pt-2">
            {name === "" ? userData.name : name}
          </h3>
          <p className="text-sm text-secondary">{userData.email}</p>
        </div>
        <div className="flex justify-between m-2">
          <Button
            className="w-34 h-7 bg-gray-100 rounded-2xl text-black ml-5"
            onClick={() => setIsOpen(true)}>
            프로필 편집
          </Button>
          <Button
            className="w-34 h-7 rounded-2xl text-white mr-5"
            onClick={() => router.push("/refund")}>
            환급액 계산
          </Button>
        </div>
        <div className="space-y-5">
          <PaymentCard
            text="이번 달 총 기부 금액"
            payment={userData.monthlyAmount}
          />
          <PaymentCard
            text="올해 총 기부 금액"
            payment={userData.yearlyAmount}
          />
        </div>

        <div className="mx-4 ">
          <div className="flex justify-between items-center pb-6">
            <h1 className="text-lg font-semibold opacity-80">전체 기부내역</h1>
            <Link href={"/profile/donationhistory"}>
              <Image
                height={20}
                width={20}
                alt="돋보기"
                src="/assets/icons/search.svg"
              />
            </Link>
          </div>
          <div className="space-y-3">
            {myDonationList.map((myDonation) => (
              <MyDonationList donation={myDonation} key={myDonation.id} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 bg-black/30 z-50 flex items-center justify-center transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}>
        <div className="flex flex-col justify-center items-center bg-white rounded-2xl p-3 space-y-6 pt-6">
          <div
            className="w-[100px] h-[100px] cursor-pointer relative"
            onClick={handleImageClick}>
            <Image
              src={
                preview ||
                (userData.profileImage && userData.profileImage !== "null"
                  ? userData.profileImage
                  : "/assets/icons/woman-profile.png")
              }
              alt="프로필"
              width={100}
              height={100}
              className="rounded-full object-cover w-full h-full"
            />
            <div
              className="absolute bottom-1 right-8 bg-white rounded-full p-1 cursor-pointer transform translate-x-1/2 translate-y-1/2 z-50"
              onClick={handleImageClick}>
              <FaCirclePlus className="text-gray text-lg" />
            </div>
          </div>

          <input
            name="profileImage"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="relative ">
            <input
              name="myname"
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                debounce(2000);
              }}
              className="text-center text-sm text-secondary m-1 bg-transparent border-none outline-none w-fit"
              style={{ color: "var(--color-secondary)" }}
            />
            <div className="absolute bottom-0 left-0 w-full h-[0.7px] bg-gray" />
          </div>
          {/* 에러 메시지 표시 */}
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          <div className="flex justify-end m-2 gap-3">
            <Button
              className="w-34 h-7 bg-gray-100 rounded-2xl text-black "
              onClick={handleConfirm}
              disabled={isPending}>
              {isPending ? "업로드 중..." : "확인"}
            </Button>
            <Button
              className="w-34 h-7 bg-gray-100 rounded-2xl text-black "
              onClick={() => setIsOpen(false)}>
              취소
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
