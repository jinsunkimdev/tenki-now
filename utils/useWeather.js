// hooks/useWeather.js
import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

const fetchWeather = async (lat=25, lon=25, unit) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
  );
  if (!response.ok) {
    throw new Error("Error fetching weather data");
  }
  return response.json();
};

export const useWeather = (unit = "metric") => {
  return useQuery({
    queryKey: ["weather", unit],
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }
      const location = await Location.getCurrentPositionAsync({});
      return fetchWeather(
        location.coords.latitude,
        location.coords.longitude,
        unit
      );
    },
  });
};
