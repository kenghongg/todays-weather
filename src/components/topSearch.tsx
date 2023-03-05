import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { FaSearch } from "react-icons/fa";
import theme from "../theme";
import { IWeatherData } from "../interfaces/weatherDataInterface";
import ContentContainer from "./contentContainer";
import ToggleProfileMode from "./toggleProfileMode";

const SearchBtn = styled(Button)({
  borderRadius: 20,
  width: 60,
  height: 60,
  padding: 0,
  background: theme.palette.mode === "dark" ? "#28124D" : "#6C40B5",
  color: "#ffffff",
});

const SearchTextFieldWrap = styled("div")({
  background: "rgba(26,26,26,0.5)",
  backdropFilter: "blur(20px)",
  padding: "18px 4px 11px",
  borderRadius: 12,
  width: "100%",
  display: "flex",
});

const SearchTextField = styled(TextField)({
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
    position: "absolute",
    bottom: -36,
    display: "inline-flex",
    width: "auto",
    fontSize: 14,
  },
});

const SearchBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  gap: 8,
});

const TopSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchApiUrl, setSearchApiUrl] = useState("");
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [searchError, setSearchError] = useState(false);
  const [className, setClassName] = useState("animate-placeholder");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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
      <SearchBox>
        <ToggleProfileMode />
        <SearchTextFieldWrap>
          <SearchTextField
            className={className}
            label="Country / City"
            value={searchTerm}
            onChange={handleInputChange}
            variant="outlined"
            // placeholder="Singapore"
            helperText={searchError && "Country / City not found"}
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
    </>
  );
};

export default TopSearch;
