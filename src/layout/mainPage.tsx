import React from "react";

import Header from "../components/header";
import TopSearch from "../components/topSearch";

import { Container, ThemeProvider } from "@mui/material";
// import theme from "../theme";
import { useDarkMode } from "../hooks/useDarkMode";

const MainPage = () => {
  const [darkMode, toggleDarkMode, theme] = useDarkMode();
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Header />
        <TopSearch />
      </Container>
    </ThemeProvider>
  );
};

export default MainPage;
