import React, { useState } from "react";
import Dropdown from "../ui/Dropdown";

interface FilterButtonsProps {
  onSortConditionChange: (condition: "최신순" | "진행중") => void;
  currentSortCondition?: "최신순" | "진행중";
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onSortConditionChange, currentSortCondition }) => {
  const [conditionType, setConditionType] = useState<"최신순" | "진행중">(currentSortCondition || "최신순"); // 초기값을 "최신순"으로 설정
  const conditionOptions: ("최신순" | "진행중")[] = ["최신순", "진행중"];

  const handleConditionTypeSelect = (value: string) => {
    const selectedCondition = value as "최신순" | "진행중";
    setConditionType(selectedCondition);
    onSortConditionChange(selectedCondition);
  };

  return (
    <div className="absolute top-[3vh] flex gap-2">
      <Dropdown
        options={conditionOptions}
        onSelect={handleConditionTypeSelect}
      >
        {conditionType}
      </Dropdown>
    </div>
  );
};

export default FilterButtons;