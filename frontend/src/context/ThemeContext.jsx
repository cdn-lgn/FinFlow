import React, { createContext, useState, useEffect } from "react";
import COLORS from "../constatnts/colors";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(prefersDark ? "dark" : "light");

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e) => setTheme(e.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const colors = COLORS[theme] || COLORS["light"];

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, colors, selectedOption, setSelectedOption }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
