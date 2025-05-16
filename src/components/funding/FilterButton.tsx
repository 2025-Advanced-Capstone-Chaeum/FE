import React, { useState } from "react";
import Dropdown from "../ui/Dropdown";

const FilterButtons = () => {
  const [conditionType, setConditionType] = useState("최신순");
  const conditionOptions = ["최신순", "진행중"];

  const handleConditionTypeSelect = (value: string) => {
    setConditionType(value);
  };

  return (
    <div className="absolute top-[3vh] flex gap-2">
      <Dropdown options={conditionOptions} onSelect={handleConditionTypeSelect}>
        {conditionType}
      </Dropdown>
    </div>
  );
};

export default FilterButtons;
