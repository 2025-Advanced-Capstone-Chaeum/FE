"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { getSavedAttendance, saveAttendance } from "@/lib/attendance";
import { generateCalendarDays } from "@/utils/dateUtils";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import AttendanceModal from "@/components/AttendanceModal";

export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<
    { date: string }[]
  >([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const saved = getSavedAttendance();
    if (saved) setAttendanceRecords(saved);
  }, []);

  useEffect(() => {
    saveAttendance(attendanceRecords);
  }, [attendanceRecords]);

  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  const handleAttendance = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    const alreadyChecked = attendanceRecords.some((record) =>
      record.date.startsWith(todayStr)
    );

    if (!alreadyChecked) {
      setAttendanceRecords((prev) => [...prev, { date: today.toISOString() }]);
      setIsOpenModal(true);
    }
  };

  const days = generateCalendarDays(currentDate);

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden">
      <div className=" text-center">
        <BackButton />
        <h1 className="text-secondary text-xl font-bold opacity-70 flex justify-center gap-2">
          출석 체크
          <Image
            height={30}
            width={30}
            alt="출석체크"
            src="/assets/icons/attendance.svg"
          />
        </h1>
      </div>

      <div className="w-full max-h-full space-y-6 p-12">
        <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-sm">
          <CalendarHeader
            currentDate={currentDate}
            onPrev={() => changeMonth(-1)}
            onNext={() => changeMonth(1)}
          />
          <CalendarGrid days={days} attendanceRecords={attendanceRecords}  />
        </div>

        <div className="p-4 flex justify-center">
          <Button
            onClick={handleAttendance}
            className="w-full h-full max-h-1/2 py-3 mb-3 text-white rounded-full shadow-md">
            출석 포인트 받기!
          </Button>
        </div>

        <AttendanceModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          totalDays={attendanceRecords.length}
        />
      </div>
    </div>
  );
}
