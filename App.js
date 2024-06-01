import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { useColorScheme } from "react-native";
import TabNavigator from "./components/Tabs";
import { darkTheme, lightTheme } from "./theme";

const queryClient = new QueryClient({});

export default function App() {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  useEffect(() => {
    setIsDark(systemColorScheme === "dark");
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <StyledThemeProvider theme={theme}>
        <NavigationContainer>
          <TabNavigator toggleTheme={toggleTheme} isDark={isDark} />
        </NavigationContainer>
      </StyledThemeProvider>
    </QueryClientProvider>
  );
}
