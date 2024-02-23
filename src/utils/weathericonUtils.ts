import Clear from "../assets/weather/clear.png";
import Clouds from "../assets/weather/clouds.png";
import Drizzle from "../assets/weather/drizzle.png";
import Mist from "../assets/weather/mist.png";
import Rain from "../assets/weather/rain.png";
import Snow from "../assets/weather/snow.png";
import Wind from "../assets/weather/wind.png";

export const getWeatherImage = (weatherStatus: string): string => {
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
