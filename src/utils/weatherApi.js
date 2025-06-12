import {coordinates, APIkey} from './constants.js'
const WeatherApi = ({ coordinates}, APIkey) => {


  return fetch(
     `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${APIkey}`
  )
         .then(res => {
    if (res.ok) {
      return res.json();
    }
    else {
      return Promise.reject(`Error: ${res.status} `);
    }
  });
  
}
export default WeatherApi;
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = data.main.temp;
  result.type = data.weather.main;
  result.type = getWeatherType(result.temp)
  return result;
}

 const getWeatherType = (temperature) => {
if (temperature >= 86) {
  return 'hot';
} else if (temperature >= 66) {
  return 'warm';
} else {
  return 'cold';
}
}
// 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={APIkey}'