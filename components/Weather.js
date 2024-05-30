import React from "react";
import styled from "styled-components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
  font-size: 48;
  color: #000;
`;
const BodyContainer = styled.View`
  flex: 2;
  align-items: flex-start;
  justify-content: flex-end;
  padding-left: 25;
  margin-bottom: 40;
`;
const Title = styled.Text`
  font-size: 48px;
  color: #fff;
`;
const SubTitle = styled.Text`
  font-size: 24px;
  color: #fff;
`;
const BodyText = styled.Text``;
const Weather = () => {
  <WeatherContainer>
    <HeaderContainer>
      <MaterialCommunityIcons size={40} name="weather-cloudy" />
    </HeaderContainer>
    <BodyContainer></BodyContainer>
  </WeatherContainer>;
};
export default Weather;
