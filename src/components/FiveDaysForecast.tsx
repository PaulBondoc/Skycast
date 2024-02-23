import { BackgroundStyle } from "../lib/types";
import { useState, useEffect } from "react";
import { fetchFiveDaysForeCast } from "../services/apiService";
import { mps_to_kmh } from "../utils/conversionUtils";
import { getWeatherImage } from "../utils/weathericonUtils";

interface WeatherData {
  weekDayName: string;
  dateNumber: number;
  monthName: string;
  highestMaxTemp: number;
  lowestMinTemp: number;
  averageWindSpeed: number;
  averagePressure: number;
  averageHumidity: number;
  averageRainChance: number;
  weatherStatus: string;
}

type ModalType = {
  label: string;
  value: string;
};

type Props = {
  city?: string;
};

const FiveDaysForecast = (props: Props) => {
  const [fiveDaysForecast, setFiveDaysForecast] = useState<WeatherData[]>([]);
  const [selectedDayData, setSelectedDayData] = useState<WeatherData | null>();
  const gradient: BackgroundStyle =
    "bg-gradient-to-bl from-gradientStart via-gradientStop to-gradientStart";

  const modalData: ModalType[] = [
    {
      label: "Max Temperature:",
      value: `${selectedDayData?.highestMaxTemp}°C`,
    },
    { label: "Min Temperature", value: `${selectedDayData?.lowestMinTemp}°C` },
    {
      label: "Wind Speed:",
      value: `${selectedDayData?.averageWindSpeed} km/h`,
    },
    { label: "Pressure:", value: `${selectedDayData?.averagePressure} hPa` },
    { label: "Humidity", value: `${selectedDayData?.averageHumidity}%` },
    { label: "Rain Change:", value: `${selectedDayData?.averageRainChance}%` },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFiveDaysForeCast(props.city);
        const daysData: WeatherData[] = [];

        for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
          const currentDate = new Date();
          const dayDate = new Date(currentDate);
          dayDate.setDate(currentDate.getDate() + dayIndex);

          const dayList: any = {};
          for (let i = dayIndex * 8; i < (dayIndex + 1) * 8; i++) {
            dayList[i - dayIndex * 8 + 1] = data.list[i];
          }

          const totalData = {
            windSpeed: 0,
            pressure: 0,
            humidity: 0,
            rainChance: 0,
          };

          let lowestMinTemp = Infinity;
          let highestMaxTemp = -Infinity;

          for (let i = 1; i <= 8; i++) {
            const dayData = dayList[i];
            const dayWindSpeed = Math.round(mps_to_kmh(dayData.wind.speed));
            const dayPressure = dayData.main.pressure;
            const dayHumidity = dayData.main.humidity;
            const dayRainChance = Math.round(dayData.pop * 100);
            const dayOneMinTemp = Math.round(dayData.main.temp_min) - 273;
            const dayOneMaxTemp = Math.round(dayData.main.temp_max) - 273;

            if (dayOneMinTemp < lowestMinTemp) {
              lowestMinTemp = dayOneMinTemp;
            }
            if (dayOneMaxTemp > highestMaxTemp) {
              highestMaxTemp = dayOneMaxTemp;
            }

            totalData.windSpeed += dayWindSpeed;
            totalData.pressure += dayPressure;
            totalData.humidity += dayHumidity;
            totalData.rainChance += dayRainChance;
          }

          const weekDayName = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
          }).format(dayDate);
          const monthName = new Intl.DateTimeFormat("en-US", {
            month: "short",
          }).format(dayDate);
          const weatherStatus = dayList[1].weather[0].main;

          // Calculate the averages after the inner loop
          const averageWindSpeed = Math.round(totalData.windSpeed / 8);
          const averagePressure = Math.round(totalData.pressure / 8);
          const averageHumidity = Math.round(totalData.humidity / 8);
          const averageRainChance = Math.round(totalData.rainChance / 8);

          daysData.push({
            weekDayName,
            dateNumber: dayDate.getDate(),
            monthName,
            highestMaxTemp,
            lowestMinTemp,
            averageWindSpeed,
            averagePressure,
            averageHumidity,
            averageRainChance,
            weatherStatus,
          });
        }

        setFiveDaysForecast(daysData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [props.city]);

  const showModal = (dayData: WeatherData) => {
    setSelectedDayData(dayData);
    const modal = document.getElementById(
      "my_modal_2"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div
        className={`${gradient} col-span-full xl:col-span-6 rounded-[10px] text-white p-4`}
      >
        <h6 className="font-medium text-[16px] mt-1 tracking-wide text-white">
          Five Days Forecast
        </h6>
        <div className="flex flex-col xs:flex-row gap-x-4">
          {fiveDaysForecast.map((dayData, index) => (
            <div
              key={index}
              className="w-full bg-glass mt-4 rounded-[8px] overflow-hidden text-center hover:scale-105 transition-all cursor-pointer"
              onClick={() => showModal(dayData)}
            >
              <h5 className="w-full bg-[#020617] font-semibold text-[15px] py-2">
                {dayData.weekDayName}
              </h5>
              <div className="flex items-center xs:block justify-evenly p-4 text-[20px]">
                <p className="font-medium">
                  {dayData.highestMaxTemp}°/{dayData.lowestMinTemp}°
                </p>
                <img
                  src={getWeatherImage(dayData.weatherStatus)}
                  alt=""
                  className="w-[50px] xs:w-[75px] xs:mx-auto xs:my-5"
                  loading="lazy"
                />
                <p className="font-medium text-[15px]">
                  {dayData.monthName} {dayData.dateNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden xs:block h-1 bg-gradient-to-r from-yellow-300 to-orange-500 mt-1 sm:mt-4 rounded-md"></div>

        {/* Modal */}
        <dialog id="my_modal_2" className="modal text-secondary">
          {selectedDayData && (
            <div className="modal-box bg-background">
              <h3 className="font-bold text-lg">
                {selectedDayData.weekDayName}, {selectedDayData.monthName}{" "}
                {selectedDayData.dateNumber}
              </h3>
              <p className="py-4 space-y-4">
                {modalData.map((item: ModalType, index: number) => (
                  <p key={index} className="font-medium">
                    <span>Average {item.label} </span>
                    {item.value}
                  </p>
                ))}
              </p>
            </div>
          )}
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedDayData(null)}>Close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default FiveDaysForecast;
