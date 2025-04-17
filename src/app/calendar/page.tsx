"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BackButton from "@/components/BackButton";

export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<
    { date: string }[]
  >([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  // Load attendance records from localStorage on component mount
  useEffect(() => {
    const savedRecords = localStorage.getItem("attendanceRecords");
    if (savedRecords) {
      setAttendanceRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Save attendance records to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "attendanceRecords",
      JSON.stringify(attendanceRecords)
    );
  }, [attendanceRecords]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleAttendance = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayStr = today.toISOString().split("T")[0];

    // Check if already attended today
    if (!attendanceRecords.some((record) => record.date.startsWith(todayStr))) {
      setAttendanceRecords([
        ...attendanceRecords,
        { date: today.toISOString() },
      ]);
      setIsOpenModal(true);
    }
  };

  // Check if a date has an attendance record
  const hasAttendance = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return attendanceRecords.some((record) => record.date.startsWith(dateStr));
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay();

    // Total days in the month
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }

    return days;
  };

  const days = generateCalendarDays();
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden ">
      <div className="pb-4 bg-[#f0f0ff] text-center">
        <BackButton>출석체크 </BackButton>
      </div>
      <div className="w-full max-h-full space-y-16 p-12 ">
        <div className="w-full mx-auto bg-white p-6 mt-10 ">
          <div>
            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="p-1">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <h2 className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button onClick={handleNextMonth} className="p-1">
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekdays.map((day, index) => (
                <div
                  key={index}
                  className="text-center text-xs font-medium text-gray-500 py-1">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    "aspect-square flex items-center justify-center relative ",
                    day ? "text-gray-800" : "text-transparent"
                  )}>
                  {day && (
                    <>
                      <span className="h-8 w-8 flex items-center justify-center rounded-full">
                        {day.getDate()}
                      </span>
                      {hasAttendance(day) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            fill
                            alt="출석 도장"
                            src="/assets/icons/footprint.svg"
                            className="object-contain"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-center">
          <Button
            onClick={handleAttendance}
            className="w-full h-full max-h-1/2 py-3 mt-6 text-white rounded-full shadow-lg ">
            출석 포인트 받기!
          </Button>
        </div>
        <div
          className={`absolute inset-0 bg-black/30  z-50 flex items-center justify-center transition-opacity duration-300 ${
            isOpenModal
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}>
          <div className="flex flex-col bg-white rounded-2xl p-6 space-y-6 pt-6">
            <h1 className="flex justify-center items-start text-secondary text-xl font-semibold opacity-80">
              출석완료 !
            </h1>
            <div className="p-2 text-secondary">
              <p className="">
                {attendanceRecords.length}일 동안 출석체크 해주셨네요.✨
              </p>
              <p className="">감사의 마음으로 오늘의 혜택🎁을 드립니다.</p>
            </div>

            <Button onClick={() => setIsOpenModal((prev) => !prev)}>
              close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
