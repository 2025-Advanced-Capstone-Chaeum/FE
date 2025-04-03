import { timeAgo } from "@/utils/dateUtils";
import { Button } from "../ui/button";
import Image from "next/image";
import { Alarm } from "@/types/dataTypes";

const TextAlarm = ({ data }: { data: Alarm }) => {
  return (
    <div className="flex gap-5">
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={data.image}
          alt="Profile avatar"
          width={50}
          height={50}
          className="rounded-full object-cover border"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex gap-2 items-center w-full">
          <div className="text-sm font-medium">{data.message}</div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="default"
              className="text-xs h-7 px-4 rounded-full">
              수락
            </Button>
            <Button
              size="default"
              className="text-xs h-7 px-4 rounded-full bg-purple-500 hover:bg-purple-600">
              삭제
            </Button>
          </div>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {timeAgo(data.created_At)}
        </span>
      </div>
    </div>
  );
};

export default TextAlarm;
