import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import theme from "../theme";
import RecordHistory from "./recordHistory";
import CurrentRecord from "./currentRecord";
import sunImgPng from "../images/sun.png";
import sunShadowImgPng from "../images/sun-shadow.png";
import { IWeatherData } from "../interfaces/weatherDataInterface";
import { ISearchHistoryProps } from "../interfaces/searchHistoryProps";
import { useEffect, useState } from "react";

const ContentBox = styled(Box)({
  marginTop: 70,
  borderRadius: 20,
  // background: "#533994",
  background: "rgba(26,26,26,0.3)",
  backdropFilter: "blur(20px)",
  padding: theme.spacing(2),
  position: "relative",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4.5),
    marginTop: 100,
  },
});

const SearchHistoryBox = styled(Box)({
  // background: "#3A2D6B",
  background: "rgba(26,26,26,0.2)",
  backdropFilter: "blur(20px)",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: 24,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3),
  },
});

const SunImg = styled("img")({
  width: 150,
  position: "absolute",
  top: -60,
  right: 20,

  [theme.breakpoints.up("md")]: {
    width: 250,
    top: -90,
    right: 40,
  },
});

const SunShadowImg = styled("img")({
  width: 150,
  position: "absolute",
  top: -60,
  right: 20,
  opacity: "0.5",

  [theme.breakpoints.up("md")]: {
    width: 250,
    top: -90,
    right: 40,
  },
});

const ContentContainer = ({ weatherData }: { weatherData: IWeatherData | null }) => {
  const [searchHistory, setSearchHistory] = useState<ISearchHistoryProps[]>([]);
  const [searchApiUrl, setSearchApiUrl] = useState("");
  const [searchWeatherData, setSearchWeatherData] = useState<IWeatherData | null>(null);

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, [weatherData]);

  const handleDelete = (index: number) => {
    const newSearchHistory = [...searchHistory];
    newSearchHistory.splice(index, 1);
    setSearchHistory(newSearchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));
  };

  const handleSearch = (city: string) => {
    // console.log(city);

    const _APPID = "a063206cd1e2e981cc372caeb328128b";
    const encodedSearchTerm = encodeURIComponent(city);
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodedSearchTerm}&APPID=${_APPID}`;

    const fetchSearchData = () => {
      setSearchApiUrl(apiURL);

      fetch(apiURL)
        .then((res) => res.json())
        .then((SearchData) => {
          console.log(SearchData);
          setSearchWeatherData(SearchData);
        });
    };

    fetchSearchData();
  };

  return (
    <ContentBox>
      {/* {console.log(searchHistory[0][0].search)} */}
      <Box>
        <SunShadowImg src={sunShadowImgPng} className="animate-sun" />
        <SunImg src={sunImgPng} />
      </Box>

      <CurrentRecord weatherData={searchWeatherData || weatherData} />

      {searchHistory.length !== 0 ? (
        <SearchHistoryBox>
          <Typography textAlign="left">Search History</Typography>
          <Box>
            {searchHistory.slice(0).map((record: ISearchHistoryProps, index) => (
              <RecordHistory
                key={index}
                city={record.city}
                country={record.country}
                time={record.time}
                onDelete={() => handleDelete(index)}
                onSearch={() => handleSearch(record.city)}
              />
            ))}
          </Box>
        </SearchHistoryBox>
      ) : (
        <></>
      )}
    </ContentBox>
  );
};

export default ContentContainer;
