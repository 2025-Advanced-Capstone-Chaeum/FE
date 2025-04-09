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
  const [startDate, setStartDate] = useState("2025.01.01");
  const [endDate, setEndDate] = useState("2025.03.12");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 bg-white text-sm text-gray rounded-lg px-2 py-1.5 shadow-sm"
          variant="ghost">
          기간 검색 <ChevronDown className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] top-[80%] bg-white">
        <DialogHeader>
          <DialogTitle>기간 선택</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="name" className="text-right">
              시작일
            </Label>
            <div className="flex items-center">
              <Input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-0.5 text-sm p-2"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="username" className="text-right">
              종료일
            </Label>
            <div className="flex items-center">
              <Input
                type="datetime-local"
                name="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-0.5 text-sm p-2"
              />
            </div>{" "}
          </div>
        </div>
        <DialogFooter>
          <div className="grid grid-cols-2 gap-4">
            <DialogClose asChild>
              <Button variant="gray" className="rounded-md py-3">
                닫기
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="rounded-md py-3 text-black ">선택완료</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DateSearchModal;
