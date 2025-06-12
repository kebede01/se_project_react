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
  result.condition = data.weather[0].main.toLowerCase();
  result.type = getWeatherType(result.temp)
  result.isDay = isDay(data.sys, Date.now());
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

const isDay = ({ sunrise, sunset }, now) => {
return (sunrise * 1000 < now && now < sunset * 1000); 
 }
