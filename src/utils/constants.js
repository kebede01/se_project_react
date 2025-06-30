export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day-weather-img/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day-weather-img/cloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day-weather-img/fog.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day-weather-img/rain.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day-weather-img/snow.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../assets/day-weather-img/storm.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night-weather-img/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night-weather-img/cloudy.svg", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night-weather-img/fog.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night-weather-img/rain.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night-weather-img/snow.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../assets/night-weather-img/storm.svg", import.meta.url).href,
  },
];
export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day-weather-img/default.svg", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night-weather-img/default.svg", import.meta.url)
      .href,
  },
};
export const APIkey = "9cf65f89056b77b01378a8a5998e91cb";
export const coordinates = {
  lat: 47.60621,
  lon: -122.33207,
};
