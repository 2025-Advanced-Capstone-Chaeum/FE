"use client";

import React, { useState } from "react";
import Image from "next/image";

const NavigationBar = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(0);
  const navItemsLeft = [
    {
      id: 1,
      src: "/assets/icons/funding.svg",
      alt: "Funding",
      label: "펀딩",
      width: 26,
      height: 27,
    },
    {
      id: 2,
      src: "/assets/icons/review.svg",
      alt: "Review",
      label: "후기",
      width: 28,
      height: 28,
    },
  ];

  const navItemsRight = [
    {
      id: 3,
      src: "/assets/icons/friend.svg",
      alt: "Friend",
      label: "친구",
      width: 25,
      height: 25,
    },
    {
      id: 4,
      src: "/assets/icons/profile.svg",
      alt: "Profile",
      label: "내 계정",
      width: 29,
      height: 29,
    },
  ];

  const handleMenuClick = (id: number) => {
    setIsActiveMenu(id);
  };

  return (
    <div className="w-full h-[4.5rem] fixed bottom-0 bg-white">
      <div
        className="absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full flex items-center justify-center cursor-pointer bg-primary opacity-80"
        onClick={() => handleMenuClick(0)}
      >
        <Image src="/assets/icons/home.svg" alt="Home" width={28} height={28} />
      </div>
      <div className="flex w-full">
        <div className="flex w-[45%] pl-12 pt-3 justify-between">
          {navItemsLeft.map((item) => (
            <div
              key={item.id}
              className="flex gap-0.5 items-center justify-center cursor-pointer"
              onClick={() => handleMenuClick(item.id)}
            >
              <div
                className={`flex flex-col items-center justify-center relative ${
                  isActiveMenu === item.id ? "opacity-50" : "opacity-100"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                />
              <span className="font-semibold text-xs text-primary">
                {item.label}
              </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <div className="flex w-1/2 pr-12 pt-3 justify-between">
            {navItemsRight.map((item) => (
              <div
                key={item.id}
                className="flex gap-0.5 items-center justify-center cursor-pointer"
                onClick={() => handleMenuClick(item.id)}
              >
                <div
                className={`flex flex-col items-center justify-center relative ${
                  isActiveMenu === item.id ? "opacity-50" : "opacity-100"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                />
                <span className="font-semibold text-xs text-primary">
                  {item.label}
                </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
