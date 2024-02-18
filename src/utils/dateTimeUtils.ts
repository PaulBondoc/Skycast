import { monthNames, weekDayNames } from "../constants/constant";

export const getDate = (): string => {
  const currentDate: Date = new Date();
  const dayName = weekDayNames[currentDate.getDay()];
  const dateNumber = currentDate.getDate();
  const monthName = monthNames[currentDate.getMonth()];

  return `${dayName} ${dateNumber} ${monthName}`;
};

export const getTime = (): string => {
  const currentDate: Date = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12}:${minutes} ${period}`;
};
