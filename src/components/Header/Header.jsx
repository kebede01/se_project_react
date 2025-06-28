import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/myavatar.jpg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddGarment, weatherData, avatarName }) {
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
       <ToggleSwitch/>
      <button
        type="button"
        className="header__button"
        onClick={handleAddGarment}
      >
        + Add clothes
      </button>
      <div className="header__user-container"></div>
      <p className="header__avatar-name">{ avatarName}</p>
      <img src={avatar} alt="avatar" className="header__avatar-img" />
    </header>
  );
}
export default Header;
