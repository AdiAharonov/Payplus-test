"use client";

import { useUser } from "@/context/userContext";
import { getEmployeesWorkingData, updateEmployeesWorkingData } from "@/server";
import { getCurrentFormattedDate, getCurrentTime } from "@/utils/formatting";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialWorkingData = {
  isWorking: false, // Currently working
  startTime: "",
  endTime: "",
  date: "",
  breakTime: "",
  dayOfWeek: "",
};

export default function Home() {
  const [workData, setWorkData] = useState(initialWorkingData);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  const currentDate = getCurrentFormattedDate();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["employee-work-data", user?.employeeId],
    queryFn: () => getEmployeesWorkingData(user?.employeeId),
    enabled: !!user,
  });

  useEffect(() => {
    if (data && data?.workingDays?.length > 0) {
      const currentDay = data.workingDays.filter(
        (day) => day.date === currentDate
      )[0];

      if (currentDay) setWorkData(currentDay)
    }
  }, [data])
  

  const startWork = async () => {
    const workDay = {
      isWorking: true,
      startTime: getCurrentTime(),
      endTime: "",
      date: currentDate,
      breakTime: "",
      dayOfWeek: "",
    };

    const data = await updateEmployeesWorkingData(user?.employeeId, workDay);
    const currentDay = data.workingDays.filter(
      (day) => day.date === currentDate
    )[0];

    setWorkData(currentDay)
  };

  const endWork = async () => {
    const workDay = {
      isWorking: false,
      date: currentDate,
    };

    const data = await updateEmployeesWorkingData(user?.employeeId, workDay);
    const currentDay = data.workingDays.filter(
      (day) => day.date === currentDate
    )[0];

    setWorkData(currentDay)
  };

  return (
    <main className="min-h-screen p-4">
      <ActionsContainer isWorking={workData.isWorking} startWork={startWork} endWork={endWork} />
      <EmployeeData
        currentDate={currentDate}
        name={user?.firstName + " " + user?.lastName}
      />
    </main>
  );
}

const ActionsContainer = ({ isWorking, startWork, endWork }) => {
  return (
    <div className="flex items-center gap-4">
      {isWorking ? (
        <>
          <button className="px-6 py-4 rounded-xl font-lg bg-pink-500">
            יציאה להפסקה
          </button>
          <button onClick={endWork} className="px-6 py-4 rounded-xl font-lg bg-lime-500">
            יציאה מהמשמרת
          </button>
        </>
      ) : (
        <button
          onClick={startWork}
          className="px-6 py-4 rounded-xl font-lg bg-pink-500"
        >
          כניסה למערכת
        </button>
      )}
    </div>
  );
};

const EmployeeData = ({ currentDate, name }) => {
  return (
    <div className="w-full bg-gray-200 rounded-xl p-4 mt-8 flex items-center gap-8">
      <div className="flex items-center">
        <p>תאריך: {currentDate}</p>
      </div>
      <div className="flex items-center">
        <p>שם: {name}</p>
      </div>
    </div>
  );
};
