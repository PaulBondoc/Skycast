import { useEffect, useState } from "react";
import { BackgroundStyle, ForecastType } from "../lib/types";
import { fetchFiveDaysForeCast } from "../services/apiService";
import { unixTimeStampToTime } from "../utils/conversionUtils";
import Clear from "../assets/weather/clear.png";
import Clouds from "../assets/weather/clouds.png";
import Drizzle from "../assets/weather/drizzle.png";
import Mist from "../assets/weather/mist.png";
import Rain from "../assets/weather/rain.png";
import Snow from "../assets/weather/snow.png";
import Wind from "../assets/weather/wind.png";
import { CiTrophy } from "react-icons/ci";

interface ForecaseType {
  list: ForecastType[];
}

type Props = {
  city?: string;
};

const TodaysForecast = (props: Props) => {
  const [forecastData, setForecastData] = useState<ForecaseType>({ list: [] });
  const forecastList = forecastData.list.slice(0, 8);
  const gradient: BackgroundStyle =
    "bg-gradient-to-tr from-gradientStart via-gradientStop to-gradientStart";

  useEffect(() => {
    const todayForecastData = async (): Promise<any> => {
      const fetchData = await fetchFiveDaysForeCast(props.city);

      setForecastData(fetchData);
    };

    todayForecastData();
  }, [props.city]);

  return (
    <>
      <div
        className={`${gradient} col-span-full sm:col-span-6 xl:col-span-3 rounded-[10px] text-white p-4 max-h-[338px] overflow-y-auto scroll-none`}
      >
        <h6 className="font-medium text-[16px] mt-1 tracking-wide text-white mb-5">
          Todays Forecast
        </h6>
        <div className="space-y-4">
          {forecastList.map((item, index: number) => (
            <div
              key={index}
              className="flex items-center justify-evenly gap-5 bg-glass shadow-sm py-2 px-5 rounded-[5px]"
            >
              <p className="text-[18px] font-medium">
                {unixTimeStampToTime(item.dt)}
              </p>
              <img
                src={getWeatherImage(item.weather[0].main)}
                alt={item.weather[0].main}
                loading="lazy"
                className="w-[60px]"
              />
              <p className="text-[20px] font-medium">
                {Math.round(item.main.temp - 273)}°c
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const getWeatherImage = (weatherStatus: string): string => {
  switch (weatherStatus) {
    case "Clear":
      return Clear;
    case "Clouds":
      return Clouds;
    case "Drizzle":
      return Drizzle;
    case "Mist":
      return Mist;
    case "Rain":
      return Rain;
    case "Snow":
      return Snow;
    case "Wind":
      return Wind;
    default:
      return "";
  }
};

export default TodaysForecast;
