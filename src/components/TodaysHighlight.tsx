import { TodaysHighlightType } from "../lib/types";
import { FaWind, FaWater, FaTemperatureHigh } from "react-icons/fa";
import { FaDroplet, FaEye, FaTemperatureFull } from "react-icons/fa6";
import BlurBackground from "./BlurBackground";

type Props = {
  windSpeed?: number;
  pressure?: number;
  maxTemp?: number;
  humidity?: number;
  visibility?: number;
  feelsLike?: number;
};

const TodaysHighlight = (props: Props) => {
  const { windSpeed, pressure, maxTemp, humidity, visibility, feelsLike } =
    props;

  const todaysHighlightData: TodaysHighlightType[] = [
    {
      icon: FaWind,
      name: "Wind Speed",
      value: windSpeed ?? 0,
      unit: "km/h",
    },
    {
      icon: FaWater,
      name: "Pressure",
      value: pressure ?? 0,
      unit: "hPa",
    },
    {
      icon: FaTemperatureHigh,
      name: "Max Temp",
      value: maxTemp ?? 0,
      unit: "°C",
    },
    {
      icon: FaDroplet,
      name: "Humidity",
      value: humidity ?? 0,
      unit: "%",
    },
    {
      icon: FaEye,
      name: "Visibility",
      value: visibility ?? 0,
      unit: "km",
    },
    {
      icon: FaTemperatureFull,
      name: "Feels Like",
      value: feelsLike ?? 0,
      unit: "°C",
    },
  ];
  return (
    <>
      <div className="col-span-full sm:col-span-6 md:col-span-8 xl:col-span-9 rounded-[10px] relative lg:overflow-hidden z-[0] p-4 md:p-5 overflow-y-auto max-h-[345px] lg:h-auto scroll-none">
        <BlurBackground />
        <h6 className="font-medium text-[16px] md:mt-1 tracking-wide text-secondary">
          Today's Highlight
        </h6>
        <div className="grid grid-cols-12 gap-4 md:gap-5 mt-4 md:mt-5">
          {todaysHighlightData.map(
            (item: TodaysHighlightType, index: number) => (
              <div
                key={index}
                className="col-span-full md:col-span-6 lg:col-span-4 bg-glass rounded-[5px] px-2 py-4 md:py-6 text-white shadow-sm"
              >
                <div className="flex items-center justify-around">
                  <item.icon className="text-[35px]" />
                  <div>
                    <p className="text-[15px] tracking-wide">{item.name}</p>
                    <span className="text-[24px] font-semibold tracking-wide">
                      {item.value}
                      <span className="text-[15px]">{item.unit}</span>
                    </span>
                  </div>
                  <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TodaysHighlight;
