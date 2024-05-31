import React from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { useWeather } from "../utils/useWeather";

const WeatherContainer = styled.View`
  flex: 1;
  background-color: #f7b733;
`;
const HeaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TempText = styled.Text`
  font-size: 48px;
  color: #000;
`;
const BodyContainer = styled.View`
  flex: 2;
  align-items: flex-start;
  justify-content: flex-end;
  padding-left: 25px;
  margin-bottom: 40px;
`;
const Title = styled.Text`
  font-size: 48px;
  color: #fff;
`;
const SubTitle = styled.Text`
  font-size: 24px;
  color: #fff;
`;
const ErrorText = styled.Text``;

const Weather = () => {
  const { data, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <WeatherContainer>
        <HeaderContainer>
          <ActivityIndicator size="large" color="#0000ff" />
        </HeaderContainer>
      </WeatherContainer>
    );
  }

  if (error) {
    return (
      <WeatherContainer>
        <HeaderContainer>
          <ErrorText>Error fetching weather data</ErrorText>
        </HeaderContainer>
      </WeatherContainer>
    );
  }

  return (
    <WeatherContainer>
      <HeaderContainer>
        <TempText>WEATHER:{data.main.temp}°</TempText>
      </HeaderContainer>
      <BodyContainer>
        <Title>{data.weather[0].main}</Title>
        <SubTitle>{data.weather[0].description}</SubTitle>
      </BodyContainer>
    </WeatherContainer>
  );
};
export default Weather;
