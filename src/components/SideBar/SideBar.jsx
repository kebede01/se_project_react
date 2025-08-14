import "./SideBar.css";
import avatarImg from "../../assets/myavatar.jpg";
// import { Link } from "react-router-dom";
const SideBar = ({ handleAddEditProfileModal, avatarName, logOut }) => {
  return (
    <section className="side-bar">
      <div className="side-bar__header">
        <img
          src={avatarImg}
          alt={`image of ${avatarName}`}
          className="side-bar__avatar"
        />

        <p className="side-bar__avatar-name">{avatarName}</p>
      </div>
      <div className="side-bar__buttons">
        <button
          type="button"
          className="side-bar__button-change"
          onClick={handleAddEditProfileModal}
        >
          Change profile data
        </button>

        <button
          type="button"
          className="side-bar__button-logout"
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </section>
  );
};

export default SideBar;
