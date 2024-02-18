import { BackgroundStyle } from "../lib/types";
import { FaCloud, FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { getDate, getTime } from "../utils/dateTimeUtils";
import { useState, useEffect } from "react";

type WeatherType = {
  icon: React.ElementType;
  data: string;
  time?: string;
};

type Props = {
  temperature?: number;
  description?: string;
  city?: string;
  country?: string;
  status?: string;
};

const CurrentWeather = (props: Props) => {
  const [currentTime, setCurrentTime] = useState<string>(getTime());
  const [currentDate, setCurrentDate] = useState<string>(getDate());
  const gradient: BackgroundStyle =
    "bg-gradient-to-tl from-gradientStart via-gradientStop to-gradientStart";

  //Auto update date and time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getTime());
      setCurrentDate(getDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  //built in data
  const weatherData: WeatherType[] = [
    {
      icon: FaLocationDot,
      data: `${props.city}, ${props.country}`,
    },
    { icon: FaCalendarAlt, data: currentDate, time: currentTime },
  ];
  return (
    <>
      <div
        className={`${gradient} col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3 rounded-[10px] text-white overflow-y-auto scroll-none`}
      >
        <div className="p-5">
          {props.status && (
            <img
              src={props.status}
              alt="Weather Icon"
              className="w-[120px]"
              loading="lazy"
            />
          )}

          <h1 className="text-[45px] font-medium">{props.temperature}°c</h1>

          <p className="flex items-center gap-[10px] text-[22px] tracking-[0.015em]">
            <FaCloud />
            <span className="text-[16px] capitalize">{props.description}</span>
          </p>
        </div>
        <div className="w-full h-[2px] bg-background"></div>
        <div className="p-4 space-y-3">
          {weatherData.map((item: WeatherType, index: number) => (
            <p
              key={index}
              className="flex items-center gap-[10px] text-[18px] tracking-[0.015em]"
            >
              <item.icon />
              <span className="text-[16px]">
                {item.data}{" "}
                <span className="font-medium">
                  {item.time ? item.time : " "}
                </span>
              </span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
