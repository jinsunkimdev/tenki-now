import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme === "dark" ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
  }, [colorScheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
