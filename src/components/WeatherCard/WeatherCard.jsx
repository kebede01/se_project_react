import { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
function WeatherCard({ weatherData }) {
  const filteredWeatherOptions = weatherOptions.filter(option => {
    return (
      option.day === weatherData.isDay  && option.condition === weatherData.condition 
    )
  })

  let weatherOption;
  if (filteredWeatherOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night" ];
  } else {
    weatherOption = filteredWeatherOptions[0]
  }

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp?.[currentTemperatureUnit]}&deg; { currentTemperatureUnit}</p>
      <img src={weatherOption?.url} alt={`${weatherOption?.condition}-weather-image`} className="weather-card__img" />
      
    </section>
  );
}
export default WeatherCard;
