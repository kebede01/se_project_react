import "./SideBar.css";
import { useContext } from "react";
// import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
const SideBar = ({ handleAddEditProfileModal, logOut }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="side-bar">
      <div className="side-bar__header">
        <img
          src={currentUser.avatarUrl}
          alt={`image of ${currentUser.name}`}
          className="side-bar__avatar"
        />

        <p className="side-bar__avatar-name">{currentUser.name}</p>
      </div>
      <div className="side-bar__buttons">
        <button
          type="button"
          className="side-bar__button-change side-bar__button"
          onClick={handleAddEditProfileModal}
        >
          Change profile data
        </button>

        <button
          type="button"
          className="side-bar__button-logout side-bar__button"
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </section>
  );
};

export default SideBar;
