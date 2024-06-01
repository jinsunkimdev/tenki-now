import React, { useState } from "react";
import { useWeather } from "../utils/useWeather";
import { Card } from "react-native-elements";
import {
  convertUnixToReadable,
  getCardStyle,
  handleLayout,
} from "../utils/customFunctions";
import * as Progress from "react-native-progress";
import styled, { withTheme } from "styled-components";
import Icon from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'expo-linear-gradient';
const StyledFlatList = styled.FlatList`
  background-color: ${(props) => props.theme.backgroundColor};
  flex: 1;
`;
const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
const TitleContainer = styled.View`
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
`;
const Row = styled.View`
  justify-content: space-between;
  margin: 0 1px;
  padding: 0 3px;
`;

const CardContainer = styled.View`
  flex: 1;
  margin: 2.5px;
  margin: 2.5px 0;
  min-width: 150px;
`;

const StyledCard = styled(Card).attrs((props) => ({
  containerStyle: {
    backgroundColor: props.theme.cardBackgroundColor,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: props.theme.cardBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
}))``;

const CardTitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.cardTitleTextColor};
  margin-bottom: 5px;
`;

const CardText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => props.theme.cardTextColor};
`;
const TempText = styled.Text`
  font-size: 30px;
  font-weight: 600;
`;
const GridView = styled.View`
  flex: 1;
`;
const ThemedProgressBar = withTheme(({ theme, progress }) => (
  <Progress.Bar
    progress={progress}
    width={null}
    height={10}
    color={theme.progressColor}
    unfilledColor="#e0e0e0"
    borderWidth={0}
  />
));
const WeatherIcon = styled(Icon)`
  font-size: 15px;
  color:${(props)=>props.theme.cardTitleTextColor};
  margin-right: 5px;
`;
const Weather = () => {
  const { data, isLoading, error } = useWeather();
  const [maxHeights, setMaxHeights] = useState([]);
  if (isLoading) {
    return (
      <Container>
        <TempText>Loading...</TempText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <TempText>Error fetching weather data</TempText>
      </Container>
    );
  }

  const weatherData = data ? [data] : [];
  const gridData = weatherData
    .map((item) => [
      {
        key: "Humidity",
        value: `${item.main.humidity}%`,
        progress: item.main.humidity / 100,icon:'water-outline'
      },
      { key: "Pressure", value: `${item.main.pressure} hPa`,icon:'speedometer-outline' },
      { key: "Visibility", value: `${item.visibility / 1000} km` ,icon:'eye-outline'},
      { key: "Wind Speed", value: `${item.wind.speed} m/s`,icon:'flag-outline'  },
      {
        key: "Cloud Cover",
        value: `${item.clouds.all}%`,
        progress: item.clouds.all / 100,
        icon:'cloudy-outline'
      },
      { key: "Ground Level", value: `${item.main.grnd_level}hPa`,icon: 'earth-outline'},
      { key: "Sea Level", value: `${item.main.sea_level}hPa`,icon:'boat-outline' },
      { key: "Sunrise", value: convertUnixToReadable(item.sys.sunrise),icon: 'sunny-outline' }, // Sunrise 시간 변환
      { key: "Sunset", value: convertUnixToReadable(item.sys.sunset),icon: 'moon-outline'}, // Sunset 시간 변환
      {
        key: "Min/Max Temperature",
        value: `Min: ${item.main.temp_min}℃ / Max: ${item.main.temp_max}℃`,icon:'thermometer-outline',
      }, // Min/Max Temperature
    ])
    .flat();

  return (
      <StyledFlatList
        data={gridData}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={Row}
        renderItem={({ item, index }) => (
          <CardContainer style={[getCardStyle(index, maxHeights)]}>
            <StyledCard
              onLayout={(event) => handleLayout(event, index, setMaxHeights)}
            >
              <TitleContainer>
                <WeatherIcon name={item.icon} />
                <CardTitle>{item.key}</CardTitle>
              </TitleContainer>
              <Card.Divider />
              <CardText>{item.value}</CardText>
              {item.progress !== undefined && (
                <ThemedProgressBar progress={item.progress} />
              )}
            </StyledCard>
          </CardContainer>
        )}
        contentContainerStyle={GridView}
      />
  );
};

export default Weather;
