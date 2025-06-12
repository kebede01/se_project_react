import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
function Header({ onClickAdd }) {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <p className="header__location-date">date LOCATION</p>
      <button type="button" className="header__button" onClick={onClickAdd}>
        + Add clothes
      </button>
      <p className="header__avatar-name">Terrence Tegegne</p>
      <img src={avatar} alt="avatar" className="header__avatar-img" />
    </header>
  );
}
export default Header;
