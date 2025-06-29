import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/myavatar.jpg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from 'react-router-dom';
function Header({ handleAddGarment, weatherData}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
    
  const avatarName = "kebede tekle";
    // Avatar name to title case
  const  toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    }
  return (
    <header className="header">
      <Link to="/">
        <img src={logo } alt="WTWR logo" className="header__logo" />
      </Link>
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
      <Link to="/profile" className="header__user-container__link">
        <p className="header__avatar-name">{ avatarName ? toTitleCase(avatarName) : "User name"}</p>
        <img src={ avatar } alt="avatar" className="header__avatar-img" />
      </Link>
    
    </header>
  );
}
export default Header;
