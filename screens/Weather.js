import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList } from "react-native";
import { useWeather } from "../utils/useWeather";
import { Card } from "react-native-elements";
import {
  convertUnixToReadable,
  getCardStyle,
  handleLayout,
} from "../utils/customFunctions";
import * as Progress from "react-native-progress";

const Weather = () => {
  const { data, isLoading, error } = useWeather();
  const [maxHeights, setMaxHeights] = useState([]);
  if (isLoading) {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }

  if (error) {
    return (
      <ScrollView style={styles.container}>
        <Text>Error fetching weather data</Text>
      </ScrollView>
    );
  }

  const weatherData = data ? [data] : [];
  // 그리드 레이아웃을 위해 데이터 항목을 여러 개의 카드로 분리
  const gridData = weatherData
    .map((item) => [
      {
        key: "Humidity",
        value: `${item.main.humidity}%`,
        progress: item.main.humidity / 100,
      },
      { key: "Pressure", value: `${item.main.pressure} hPa` },
      { key: "Visibility", value: `${item.visibility / 1000} km` },
      { key: "Wind Speed", value: `${item.wind.speed} m/s` },
      {
        key: "Cloud Cover",
        value: `${item.clouds.all}%`,
        progress: item.clouds.all / 100,
      },
      { key: "Ground Level", value: `${item.main.grnd_level}hPa` },
      { key: "Sea Level", value: `${item.main.sea_level}hPa` },
      { key: "Sunrise", value: convertUnixToReadable(item.sys.sunrise) }, // Sunrise 시간 변환
      { key: "Sunset", value: convertUnixToReadable(item.sys.sunset) }, // Sunset 시간 변환
      {
        key: "Min/Max Temperature",
        value: `Min: ${item.main.temp_min}°C / Max: ${item.main.temp_max}°C`,
      }, // Min/Max Temperature
    ])
    .flat();

  return (
    <FlatList
      data={gridData}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item, index }) => (
        <View style={[styles.cardContainer, getCardStyle(index, maxHeights)]}>
          <Card
            containerStyle={[styles.card, getCardStyle(index, maxHeights)]}
            onLayout={(event) => handleLayout(event, index, setMaxHeights)}
          >
            <Text style={styles.cardTitle}>{item.key}</Text>
            <Card.Divider />
            <Text style={styles.cardText}>{item.value}</Text>
            {item.progress !== undefined && (
              <Progress.Bar
                progress={item.progress}
                width={null}
                height={10}
                color="#3498db"
                unfilledColor="#e0e0e0"
                borderWidth={0}
              />
            )}
          </Card>
        </View>
      )}
      contentContainerStyle={styles.gridView}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7b733", // 배경 색상 예시
    padding: 20,
  },
  row: {
    justifyContent: "space-between", // 카드 사이의 간격을 균일하게 설정
  },
  cardContainer: {
    flex: 1,
    marginBottom: 5,
    marginTop: 5,
    minWidth: 150, // 각 카드의 최소 너비를 설정하여 균일하게 배치
  },
  card: {
    backgroundColor: "#ffffff", // 카드 배경 색상 예시
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    color: "#000", // 텍스트 색상 예시
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#000", // 텍스트 색상 예시
  },
  gridView: {
    flex: 1,
  },
});

export default Weather;
