import { useCallback, useEffect, useState } from "react";
import { Box, Typography, Skeleton } from "@mui/material";
import { IWeatherData } from "../interfaces/weatherDataInterface";

const CurrentRecord = ({ weatherData }: { weatherData: IWeatherData | null }) => {
  const [loading, setLoading] = useState(true);
  // const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [responseData, setResponseData] = useState("");

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         "https://api.openweathermap.org/data/2.5/weather?q=Singapore&APPID=a063206cd1e2e981cc372caeb328128b"
  //       );
  //       const data = await response.json();
  //       setWeatherData(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 2000);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {/* {console.log(weatherData)} */}
      {!loading && weatherData ? (
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box>
            <Box textAlign="left" minWidth="140px">
              <Typography fontSize={{ xs: "14px", md: "16px" }}>Today's Weather</Typography>
              <Typography variant="h2" fontWeight="bold">
                {Math.round(weatherData.main.temp - 273.15)}°C
              </Typography>
            </Box>
            <Box display="flex" gap="12px" justifyContent="flex-start">
              <Typography fontSize={{ xs: "14px", md: "16px" }}>
                H: {Math.round(weatherData.main.temp_max - 273.15)}°
              </Typography>
              <Typography fontSize={{ xs: "14px", md: "16px" }}>
                L: {Math.round(weatherData.main.temp_min - 273.15)}°
              </Typography>
            </Box>
            <Box textAlign="left">
              <Typography fontWeight="bold" fontSize={{ xs: "14px", md: "16px" }}>
                {weatherData.name}, {weatherData.sys.country}
              </Typography>
            </Box>
          </Box>
          <Box
            textAlign="right"
            display={{ md: "flex" }}
            justifyContent="space-between"
            width="100%"
            flexDirection={{ md: "row-reverse" }}
            marginLeft={{ md: "16px" }}
          >
            <Typography marginTop="4px" textTransform="capitalize" fontSize={{ xs: "14px", md: "16px" }}>
              {weatherData.weather[0].description}
            </Typography>
            <Typography marginTop="4px" fontSize={{ xs: "14px", md: "16px" }}>Humidity: {weatherData.main.humidity}%</Typography>
            <Typography marginTop="4px" fontSize={{ xs: "14px", md: "16px" }}>
              {new Date(weatherData.dt * 1000)
                .toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
                .replace(",", "")
                .replace(" ", " ")}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="flex-end">
            <Box width="50%">
              <Box textAlign="left">
                <Typography>
                  <Skeleton width="200px" />
                </Typography>
                <Typography variant="h2" fontWeight="bold">
                  <Skeleton />
                </Typography>
              </Box>
              <Box display="flex" gap="12px" justifyContent="flex-start">
                <Typography>
                  <Skeleton width="80px" />
                </Typography>
                <Typography>
                  <Skeleton width="80px" />
                </Typography>
              </Box>
              <Box textAlign="left">
                <Typography fontWeight="bold">
                  <Skeleton />
                </Typography>
              </Box>
            </Box>
            <Box textAlign="right" width="40%">
              <Typography width="100%">
                <Skeleton width="30%" style={{ marginLeft: "auto" }} />
              </Typography>
              <Typography width="100%">
                <Skeleton width="70%" style={{ marginLeft: "auto" }} />
              </Typography>
              <Typography width="100%">
                <Skeleton width="100%" style={{ marginLeft: "auto" }} />
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default CurrentRecord;
