import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native";
import Weather from "./components/Weather";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";

const API_KEY = process.env.EXPO_WEATHER_API_KEY;
const queryClient = new QueryClient({}); 

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 24px;
`;
const ErrorText = styled.Text`
  font-size: 24px;
`;
export default function App() {
  const [unit, setUnit] = useState('metric');
  const [loading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchWeather = async(lat = 25, lon = 25, unit='metric') => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setTemperature(json.main.temp);
        setWeatherCondition(json.weather[0].main);
        setLoading(false);
        return
      })
      .catch((error) => {
        setError("Error getting weather conditions");
        setLoading(false);
      });
  };

  return (
    <Container>
    {loading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : error ? (
      <ErrorText>{error}</ErrorText>
    ) : (
      <Weather temperature={temperature} weatherCondition={weatherCondition} />
    )}
  </Container>
  );
}
