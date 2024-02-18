import { GiSunset, GiSunrise } from "react-icons/gi";
import { BsCloudsFill } from "react-icons/bs";
import { BackgroundStyle } from "../lib/types";

type SunAndCloudsType = {
  icon: React.ElementType;
  title: string;
  time?: string;
  clouds?: number;
};

type Props = {
  sunset?: string;
  sunrise?: string;
  clouds?: number;
};

const SunAndClouds = (props: Props) => {
  const gradient: BackgroundStyle =
    "bg-gradient-to-br from-gradientStart via-gradientStop to-gradientStart";

  const sunAndCloudsData: SunAndCloudsType[] = [
    { icon: GiSunrise, title: "Sunrise", time: props.sunrise },
    { icon: GiSunset, title: "Sunset", time: props.sunset },
    { icon: BsCloudsFill, title: "Clouds", clouds: props.clouds },
  ];
  return (
    <>
      <div
        className={`${gradient} col-span-full sm:col-span-6 xl:col-span-3 rounded-[10px] text-white p-4`}
      >
        <h6 className="font-medium text-[16px] mt-1 tracking-wide text-white mb-5">
          Sun & Clouds
        </h6>
        <div className="space-y-4">
          {sunAndCloudsData.map((item: SunAndCloudsType, index: number) => (
            <div
              key={index}
              className="flex items-center gap-5 bg-glass shadow-sm py-3 px-5 rounded-[5px]"
            >
              <item.icon className="text-[35px]" />
              <div>
                <p className="text-[12px]">{item.title}</p>
                <p className="text-[22px] font-medium">
                  {item.time ? item.time : `${item.clouds}%`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SunAndClouds;
