import { useState, useEffect } from "react";
import { WeatherDataType } from "./lib/types";
import { fetchCurrentWeather } from "./services/apiService";
import {
  m_to_km,
  mps_to_kmh,
  unixTimeStampToTime,
} from "./utils/conversionUtils";
import Clear from "./assets/weather/clear.png";
import Clouds from "./assets/weather/clouds.png";
import Drizzle from "./assets/weather/drizzle.png";
import Mist from "./assets/weather/mist.png";
import Rain from "./assets/weather/rain.png";
import Snow from "./assets/weather/snow.png";
import Wind from "./assets/weather/wind.png";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodaysHighlight from "./components/TodaysHighlight";
import FiveDaysForecast from "./components/FiveDaysForecast";
import SunAndClouds from "./components/SunAndClouds";
import TodaysForecast from "./components/TodaysForecast";
import NotFound from "./components/NotFound";
import Loader from "./components/Loader";
import SmallScreenSearchBar from "./components/SmallScreenSearchBar";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherDataType>();
  const [weatherImage, setWeatherImage] = useState<string>();
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>("bulacan");

  //Get the current weather data
  useEffect(() => {
    const currentWeatherData = async (): Promise<any> => {
      try {
        setIsLoading(true);
        const fetchedData: WeatherDataType = await fetchCurrentWeather(city);

        setWeatherData(fetchedData);
        setIsNotFound(false);
      } catch (error) {
        setIsNotFound(true);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    currentWeatherData();
  }, [city]);

  //current weather image
  useEffect(() => {
    if (weatherData?.weather[0].main === "Clear") {
      setWeatherImage(Clear);
    } else if (weatherData?.weather[0].main === "Clouds") {
      setWeatherImage(Clouds);
    } else if (weatherData?.weather[0].main === "Drizzle") {
      setWeatherImage(Drizzle);
    } else if (weatherData?.weather[0].main === "Mist") {
      setWeatherImage(Mist);
    } else if (weatherData?.weather[0].main === "Rain") {
      setWeatherImage(Rain);
    } else if (weatherData?.weather[0].main === "Snow") {
      setWeatherImage(Snow);
    } else if (weatherData?.weather[0].main === "Wind") {
      setWeatherImage(Wind);
    } else {
      setWeatherImage("");
    }
  }, [weatherData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            city={weatherData?.name}
            country={weatherData?.sys.country}
            onSearch={setCity}
          />

          <main className="min-h-[80vh] px-3 sm:px-5 pb-3 sm:pb-5">
            <SmallScreenSearchBar onSearch={setCity} />

            {isNotFound ? (
              <NotFound />
            ) : (
              <section className="grid grid-cols-12 gap-3 sm:gap-5">
                <CurrentWeather
                  temperature={Math.round(weatherData?.main.temp ?? 0)}
                  description={weatherData?.weather[0].description}
                  city={weatherData?.name}
                  country={weatherData?.sys.country}
                  status={weatherImage}
                />

                <TodaysHighlight
                  windSpeed={Math.round(
                    mps_to_kmh(weatherData?.wind.speed ?? 0)
                  )}
                  pressure={weatherData?.main.pressure}
                  maxTemp={Math.round(weatherData?.main.temp_max ?? 0)}
                  humidity={weatherData?.main.humidity}
                  visibility={Math.round(m_to_km(weatherData?.visibility ?? 0))}
                  feelsLike={Math.round(weatherData?.main.feels_like ?? 0)}
                />

                <FiveDaysForecast city={city} />

                <SunAndClouds
                  sunset={unixTimeStampToTime(weatherData?.sys.sunset ?? 0)}
                  sunrise={unixTimeStampToTime(weatherData?.sys.sunrise ?? 0)}
                  clouds={weatherData?.clouds.all}
                />

                <TodaysForecast city={city} />
              </section>
            )}
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
