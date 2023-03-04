import { useCallback, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { FaSearch } from "react-icons/fa";
import theme from "../theme";
import CurrentRecord from "./currentRecord";
import { IWeatherData } from "../interfaces/weatherDataInterface";
import ContentContainer from "./contentContainer";
import mapSingaporePng from "../images/map-singapore.png";

const SearchBtn = styled(Button)({
  borderRadius: 20,
  width: 60,
  height: 60,
  padding: 0,
  background: "#28124D",
  color: "#ffffff",
});

const SearchTextFieldWrap = styled("div")({
  // background: "#44327E",
  background: "rgba(26,26,26,0.5)",
  backdropFilter: "blur(20px)",
  padding: "18px 4px 11px",
  borderRadius: 12,
  width: "100%",
  display: "flex",
});

const SearchTextField = styled(TextField)({
  // background: "#44327E",
  // background: "rgba(26,26,26,0.5)",
  background: "transparent",
  position: "relative",
  // backdropFilter: "blur(20px)",
  width: "100%",
  borderRadius: 8,
  "& .MuiInputBase-root": {},
  "& .MuiInputLabel-root": {
    transform: "translate(14px, -9px) scale(0.75)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "& .MuiOutlinedInput-input": {
    padding: "8px 14px 0",
  },
  "& .MuiFormHelperText-root": {
    // background:"salmon",
    position: "absolute",
    bottom: -36,
    display: "inline-flex",
    width: "auto",
    // fontWeight: "bold",
    fontSize: 14,
  },
});

const SearchBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  gap: 8,
});

const InsertInputBox = styled(Box)({
  display: "flex",
  width: "100%",
  marginTop: 30,
  // height: 50,
  // background: "salmon",
  justifyContent: "center",
  alignItems: "flex-end",
});

const MapSingaporeImg = styled("img")({
  width: "100%",
  maxWidth: 300,

  [theme.breakpoints.up("md")]: {},
});

const TopSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchApiUrl, setSearchApiUrl] = useState("");
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [className, setClassName] = useState("animate-placeholder");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // setTimeout(() => {
    //   handleSearch();
    // }, 300);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      // 👇 Get input value
      handleSearch();
    }
  };

  const handleClick = () => {
    setClassName("");
  };

  const handleSearch = async () => {
    const _APPID = "a063206cd1e2e981cc372caeb328128b";
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodedSearchTerm}&APPID=${_APPID}`;
    // const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=johor&APPID=a063206cd1e2e981cc372caeb328128b`;
    // pass the new API URL to the CurrentRecord component

    // Store search term in local storage
    const timeStamp = new Date()
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .replace(",", "")
      .replace(" ", " ");
    const searchHistory = localStorage.getItem("searchHistory")
      ? JSON.parse(localStorage.getItem("searchHistory") as string)
      : [];

    // searchHistory.unshift({ search: searchTerm, time: timeStamp });
    // localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    const fetchSearchData = () => {
      setSearchApiUrl(apiURL);

      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.name);
          // console.log(data.sys.country);
          searchHistory.unshift({ city: data.name, country: data.sys.country, time: timeStamp });
          localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
          setSearchTerm("");
          setWeatherData(data);
        });
    };

    fetchSearchData();
  };

  useEffect(() => {
    // default = Singapore
    if (searchApiUrl === "") {
      setSearchApiUrl(
        "https://api.openweathermap.org/data/2.5/weather?q=Singapore&APPID=a063206cd1e2e981cc372caeb328128b"
      );
    }

    const fetchData = async () => {
      try {
        const response = await fetch(searchApiUrl);
        const data = await response.json();
        if (!response.ok) {
          setSearchError(true);
          // If the API responds meaningful error message,
          // then you can get it by calling response.statusText
          throw new Error("Sorry something went wrong");
        } else {
          setSearchError(false);
          setWeatherData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchApiUrl]);

  return (
    <>
      {/* {weatherData && <>{Math.round(weatherData.main.temp - 273.15)}°C</>} */}

      <SearchBox>
        <SearchTextFieldWrap>
          <SearchTextField
            className={className}
            label="Country / City"
            value={searchTerm}
            onChange={handleInputChange}
            variant="outlined"
            // placeholder="Singapore"
            helperText={searchError && "Country not found"}
            error={searchError ? true : false}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
          />
        </SearchTextFieldWrap>
        <SearchBtn onClick={handleSearch} type="submit">
          <FaSearch size="16px" />
        </SearchBtn>
      </SearchBox>

      <ContentContainer weatherData={weatherData} />

      {/* <InsertInputBox> */}
      {/* <MapSingaporeImg src={mapSingaporePng} /> */}
      {/* <Typography variant="h5" textAlign="center">Enter a city or country to check weather</Typography> */}
      {/* </InsertInputBox> */}
    </>
  );
};

export default TopSearch;
