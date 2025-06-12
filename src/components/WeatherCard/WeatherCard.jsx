import "./WeatherCard.css";
import sunny from "../../assets/sunny.svg";
import cloudy from "../../assets/cloudy.svg";
import rain from "../../assets/rain.svg";
import snow from "../../assets/snow.svg";
import storm from "../../assets/storm.svg";
import fog from "../../assets/fog.svg";
function WeatherCard({weatherCard}) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherCard.temp} degree</p>
      <img src={sunny} alt="weather image" className="weather-card__img" />
    </section>
  );
}
export default WeatherCard;
