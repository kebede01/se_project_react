import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
function WeatherCard({ weatherCard }) {
  const filteredWeatherOptions = weatherOptions.filter(option => {
    return (
      option.day === weatherCard.isDay  && option.condition === weatherCard.condition 
    )
  })

  let weatherOption;
  if (filteredWeatherOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherCard.isDay ? "day" : "night" ];
  } else {
    weatherOption = filteredWeatherOptions[0]
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherCard.temp}&deg;F</p>
      <img src={weatherOption?.url} alt={`${weatherOption?.condition}-weather-image`} className="weather-card__img" />
      
    </section>
  );
}
export default WeatherCard;
