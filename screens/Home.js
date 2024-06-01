import React from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useWeather } from "../utils/useWeather";
import weatherIcons from "../utils/weatherIcons";
import { ActivityIndicator } from "react-native";

const WeatherContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
`;
const HeaderContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const TempText = styled.Text`
  font-size: 58px;
  font-weight: 700;
  color: ${(props) => props.theme.subTextColor};
`;
const TinyText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const WeatherIcon = styled(MaterialCommunityIcons)`
  font-size: 70px;
  color: ${(props) => props.theme.textColor};
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
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const SubTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.subTextColor};
`;
const HeaderWeatherInfo = styled.View`
  align-items: center;
`;

const Home = () => {
  const { data, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <WeatherContainer>
        <HeaderContainer>
          <ActivityIndicator size="large" />
        </HeaderContainer>
      </WeatherContainer>
    );
  }

  if (error) {
    return (
      <WeatherContainer>
        <HeaderContainer>
          <TempText>Error fetching weather data</TempText>
        </HeaderContainer>
      </WeatherContainer>
    );
  }
  return (
    <WeatherContainer>
      <HeaderContainer>
        <WeatherIcon name={weatherIcons[data.weather[0].main]} />
        <HeaderWeatherInfo>
          {data.name && data.sys.country && (
            <TinyText>
              {data.name}, {data.sys.country}
            </TinyText>
          )}
          <TempText>{data.main.temp.toFixed(1)}℃</TempText>
          <TinyText>Feels like {data.main.feels_like}℃</TinyText>
        </HeaderWeatherInfo>
      </HeaderContainer>
      <BodyContainer>
        <Title>{data.weather[0].main}</Title>
        <SubTitle>{data.weather[0].description}</SubTitle>
      </BodyContainer>
    </WeatherContainer>
  );
};
export default Home;
