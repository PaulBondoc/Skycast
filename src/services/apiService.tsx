import axios from "axios";

const API_URL: string = import.meta.env.VITE_API_URL;
const API_KEY: string = import.meta.env.VITE_API_KEY;

export const fetchCurrentWeather = async (
  city: string | undefined
): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/weather`, {
      params: {
        q: city,
        units: "metric",
        appid: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

export const fetchFiveDaysForeCast = async (
  city: string | undefined
): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/forecast`, {
      params: {
        q: city,
        unit: "metric",
        appid: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetch five days forecast:", error);
  }
};
