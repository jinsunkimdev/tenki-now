import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Weather from "../screens/Weather";
import styled, { useTheme } from "styled-components";

const Tab = createBottomTabNavigator();
const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;
const ThemeSwitch = styled.Switch`
  margin-left: 8px;
`;
export default function TabNavigator({ toggleTheme, isDark }) {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Weather") {
            iconName = "map-marker-account";
          } else if (route.name === "Detail") {
            iconName = "grid";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarStyle: { backgroundColor: theme.menuBackgroundColor },
        tabBarActiveTintColor: theme.subTextColor,
        tabBarInactiveTintColor: theme.backgroundColor,
        headerStyle: { backgroundColor: theme.menuBackgroundColor },
        headerTitleStyle: { color: theme.subTextColor },
        headerRight: () => (
          <SwitchContainer>
            <MaterialCommunityIcons
              name={isDark ? "weather-night" : "white-balance-sunny"}
              size={24}
              color={isDark ? theme.textColor : "salmon"}
            />
            <ThemeSwitch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor={theme.backgroundColor}
              onValueChange={toggleTheme}
              value={isDark}
            />
          </SwitchContainer>
        ),
      })}
    >
      <Tab.Screen name="Weather" component={Home} />
      <Tab.Screen name="Detail" component={Weather} />
    </Tab.Navigator>
  );
}
