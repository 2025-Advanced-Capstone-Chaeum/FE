import React from "react";
import { Button } from "../ui/button";

const SelectAmount = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 px-12 sm:pt-3 sm:px-22 md:pt-5 md:px-42">
        <span className="text-sm">기부 금액 선택</span>
        <div className="flex justify-center items-center gap-2">
          <Button variant="soft" className="w-[150px] py-5">
            1000원
          </Button>
          <Button variant="soft" className="w-[150px] py-5">
            3000원
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button variant="soft" className="w-[150px] py-5">
            5000원
          </Button>
          <Button variant="soft" className="w-[150px] py-5">
            10000원
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button variant="soft" className="w-[150px] py-5">
            30000원
          </Button>
          <Button variant="soft" className="w-[150px] py-5">
            50000원
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectAmount;
