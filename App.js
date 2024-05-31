import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import TabNavigator from "./components/Tabs";
import { darkTheme, lightTheme } from "./theme";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient({});

export default function App() {
  const isDark = useColorScheme() === "dark";
  const theme = isDark ? darkTheme : lightTheme;
  console.log("Current color scheme:", isDark ? "dark" : "light");
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
