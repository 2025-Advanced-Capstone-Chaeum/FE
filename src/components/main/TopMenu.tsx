import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const TopMenu = () => {
  const menuItems = [
    {
      id: 1,
      src: "/assets/icons/inventory.svg",
      alt: "Inventory",
      label: "인벤토리",
      width: 40,
      height: 40,
    },
    {
      id: 2,
      src: "/assets/icons/calendar.svg",
      alt: "Calendar",
      label: "출석체크",
      width: 40,
      height: 40,
    },
    {
      id: 3,
      src: "/assets/icons/mission.svg",
      alt: "Mission",
      label: "미션",
      width: 40,
      height: 40,
    },
    {
      id: 4,
      src: "/assets/icons/alarm.svg",
      alt: "Alarm",
      label: "알림",
      width: 33,
      height: 33,
    },
  ];

  return (
    <div className="flex p-7 sm:p-10 md:p-15 justify-between">
      {menuItems.map((item) => (
        <div className="flex flex-col items-center gap-2" key={item.id}>
          <Button variant="ghost" size="sm">
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
            />
          </Button>
          <span className="font-semibold text-xs text-secondary">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TopMenu;
