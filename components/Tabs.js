import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Weather from "../screens/Weather";
import { useTheme } from "styled-components";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
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
      })}
    >
      <Tab.Screen name="Weather" component={Home} />
      <Tab.Screen name="Detail" component={Weather} />
    </Tab.Navigator>
  );
}
