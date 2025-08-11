import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/myavatar.jpg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
function Header({ handleAddGarment, weatherData , onRegistration}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

 
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="WTWR logo" className="header__logo" />
      </Link>
      <p className="header__location-date">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        type="button"
        className="header__button"
        onClick={handleAddGarment}
      >
        + Add clothes
      </button>
      {/* <div className="header__user-container"></div> */}
      <Link to="/profile" className="header__user-container__link">
        <p className="header__sign-up" onClick={onRegistration}>
          Sign up
        </p>
       
        <p className="header__sign-in">
          Sign in
        </p>
      </Link>
    </header>
  );
}
export { Header };
