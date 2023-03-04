interface IWeatherData {
  dt: number;
  weather: any;
  sys: any;
  name: any;
  main: {
    humidity: any;
    temp_min: number;
    temp_max: number;
    temp: number;
  };
}

interface ICurrentRecordProps {
  weatherData: IWeatherData | null;
  apiURL: string; // add apiURL prop
}

export type { IWeatherData, ICurrentRecordProps };
