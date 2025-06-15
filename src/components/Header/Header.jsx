import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
function Header({ handleAddGarment, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__location-date">
        {currentDate} {weatherData.city}
      </p>
      <button
        type="button"
        className="header__button"
        onClick={handleAddGarment}
      >
        + Add clothes
      </button>
      <p className="header__avatar-name">Terrence Tegegne</p>
      <img src={avatar} alt="avatar" className="header__avatar-img" />
    </header>
  );
}
export default Header;
