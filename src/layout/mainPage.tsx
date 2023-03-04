import React from "react";

import Header from "../components/header";
import TopSearch from "../components/topSearch";

import ContentContainer from "../components/contentContainer";
import { Container } from "@mui/material";

const MainPage = () => {
  return (
    <Container maxWidth='md'>
      <Header />
      <TopSearch />
      {/* <ContentContainer /> */}
    </Container>
  );
};

export default MainPage;
