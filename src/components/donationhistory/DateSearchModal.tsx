import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

const DateSearchModal = () => {
  const [startDate, setStartDate] = useState("2025-04-09T19:46");
  const [endDate, setEndDate] = useState("2025-04-09T19:46");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 bg-white text-sm text-gray rounded-lg px-2 py-1.5  "
          variant="ghost">
          기간 검색 <ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] !h-[35vh] rounded-3xl top-[78%] bg-white border border-transparent">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-secondary text-xl font-regular opacity-75">
            기간 선택
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="startDate"
              className="text-right text-base text-secondary opacity-80 ">
              시작일
            </Label>
            <div className="flex items-center">
              <Input
                type="datetime-local"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-0.5 text-base text-secondary p-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Label
              htmlFor="endDate"
              className="text-right text-secondary text-base opacity-80">
              종료일
            </Label>
            <div className="flex items-center">
              <Input
                type="datetime-local"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-0.5 text-base text-secondary p-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
              />
            </div>{" "}
          </div>
        </div>
        <DialogFooter>
          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button
                variant="gray"
                className="h-[5vh] text-secondary text-base rounded-2xl py-3">
                닫기
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="h-[5vh] text-secondary text-base rounded-2xl py-3 ">
                선택완료
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DateSearchModal;
