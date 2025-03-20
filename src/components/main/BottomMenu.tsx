import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const BottomMenu = () => {
  const menuItems = [
    {
      id: 1,
      src: "/assets/icons/feed.svg",
      alt: "Feed",
      label: "사료주기",
      width: 50,
      height: 50,
    },
    {
      id: 2,
      src: "/assets/icons/play.svg",
      alt: "Play",
      label: "놀아주기",
      width: 50,
      height: 50,
    },
    {
      id: 3,
      src: "/assets/icons/stroke.svg",
      alt: "Stroke",
      label: "쓰다듬기",
      width: 55,
      height: 50,
    },
  ];

  return (
    <div className="flex p-4 sm:p-6 md:p-8 justify-between">
      {menuItems.map((item) => (
        <Button
          variant="soft"
          size="lg"
          className="flex flex-col px-4 py-3 gap-2"
          key={item.id}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
          />
          <div className={`flex flex-col ${item.id !== 3 ? "pt-[7px]" : "pt-0"}`}>
            <span className="font-semibold text-sm text-secondary">
              {item.label}
            </span>

            <span className="font-semibold text-sm text-accent">0/3</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default BottomMenu;
