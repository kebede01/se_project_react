import "./Header.css";
import logo from "../../assets/logo.svg";
// import avatar from "../../assets/myavatar.jpg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({ handleAddGarment, weatherData , onRegistration, onAddLogIn}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser, isLoggedIn} = useContext(CurrentUserContext);
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
     
      {isLoggedIn ? ( <Link  to="/profile" className="header__user-container__link">
        <p className="header__avatar-name">{currentUser.name}</p>
        <img src={ currentUser.avatar} alt="avatar" className="header__avatar-img" />
       
        
      </Link>) : ( <div  className="header__user-container__link">
        <button className="header__sign-up" onClick={onRegistration}>
          Sign up
        </button>
          <div  className="header__login">
            <button className="header__sign-in" onClick={onAddLogIn}>
          Sign in
        </button>
          </div>
        
      </div>)}
    </header>
  );
}
export { Header };
