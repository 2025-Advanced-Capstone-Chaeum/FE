import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import 공부 from "../../../../public/assets/images/study.png";
type campaignProps = {
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  photo: string;
  title: string;
};

const FundingListPage = () => {
  //sample data
  const donationCampaigns: campaignProps[] = [
    {
      targetAmount: 5000000,
      currentAmount: 1200000,
      deadline: new Date(2025, 5, 30),
      photo: "",
      title: "소외된 아이들에게 따뜻한 겨울을 선물하세요!",
    },
    {
      targetAmount: 3000000,
      currentAmount: 1500000,
      deadline: new Date(2025, 3, 15),
      photo: "",
      title: "유기동물 보호소 사료 기부 캠페인",
    },
    {
      targetAmount: 10000000,
      currentAmount: 6500000,
      deadline: new Date(2025, 7, 10),
      photo: "",
      title: "희귀병 어린이를 위한 의료비 지원 프로젝트",
    },
    {
      targetAmount: 8000000,
      currentAmount: 3200000,
      deadline: new Date(2025, 4, 20),
      photo: "",
      title: "환경 보호를 위한 해양 정화 활동",
    },
    {
      targetAmount: 6000000,
      currentAmount: 2900000,
      deadline: new Date(2025, 6, 5),
      photo: "",
      title: "청소년 교육 격차 해소를 위한 도서 기부",
    },
    {
      targetAmount: 7000000,
      currentAmount: 500000,
      deadline: new Date(2025, 2, 28),
      photo: "",
      title: "저소득층 가정을 위한 생필품 지원 프로젝트",
    },
  ];

  // 기부의 목표 날짜로부터 남은 날짜 계산
  const getRemainingDays = (deadline: Date): string => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "오늘 마감";
    if (diffDays <= 3) return "마감 임박";
    return `${diffDays}일 남음`;
  };

  //data를 feed로 올리기위한 값으로 변경, ex) 목표달성 % or 마감기한
  const transformedCampaigns = donationCampaigns.map((campaign) => ({
    currentPercent: Math.floor(
      (campaign.currentAmount / campaign.targetAmount) * 100
    ),
    deadline: getRemainingDays(campaign.deadline),
    photo: campaign.photo,
    title: campaign.title,
  }));

  return (
    <div className="flex min-h-screen flex-col px-8 py-2">
      {/* Filter dropdown */}
      <div className="absolute top-[8vh] flex gap-2">
        <button className={StButton}>
          최신순 <ChevronDown className="h-4 w-4" />
        </button>
        <button className={StButton}>
          추천순 <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Projects grid */}
      <div className="relative top-[12vh] mt-[10px] grid grid-cols-2 gap-3  ">
        {" "}
        {transformedCampaigns.map((feed) => (
          <div key={feed.title} className="flex flex-col">
            <div className="relative flex items-center justify-between mb-3">
              <div className="relative text-primary text-baseline px-0.5 py-0.5 rounded-md">
                {feed.currentPercent}% 달성
              </div>
              <div
                className="relative h-5 flex justify-item-center items-center bg-accent text-accent text-xs px-2 rounded-md"
                style={{ backgroundColor: "rgba(255, 0, 0, 0.2)" }}>
                {feed.deadline}
              </div>
            </div>
            <Image
              src={feed.photo || 공부}
              alt="펀딩 프로젝트"
              width={150}
              height={100}
              className="w-full h-auto rounded-lg object-cover"
            />
            <p className="text-xs mt-2.5 text-left">
              {feed.title.length > 17
                ? feed.title.slice(0, 16) + ".."
                : feed.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StButton =
  "flex items-center gap-1 bg-white text-sm rounded-lg px-2 py-1.5 shadow-sm";

export default FundingListPage;
