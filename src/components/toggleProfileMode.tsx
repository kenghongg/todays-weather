import { Button, createTheme, styled, ThemeProvider } from "@mui/material";
import { useDarkMode } from "../hooks/useDarkMode";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleModeBtn = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  width: 60,
  height: 60,
  padding: 0,
  background: theme.palette.mode === "dark" ? "#e0b636" : "#10304f",
  color: "#ffffff",
  transition: "0.3s all",
  opacity: "1",
  "&:hover": {
    background: theme.palette.mode === "dark" ? "#e0b636" : "#10304f",
  },
}));

const ToggleProfileMode = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <ToggleModeBtn onClick={toggleDarkMode}>
        {darkMode ? <FaSun size="16px" /> : <FaMoon size="16px" />}
      </ToggleModeBtn>
    </ThemeProvider>
  );
};

export default ToggleProfileMode;
