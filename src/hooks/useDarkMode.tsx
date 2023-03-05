import { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

export function useDarkMode(): [boolean, () => void, any] {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: 'Noto Sans'
    },
  });

  return [darkMode, toggleDarkMode, theme];
}
