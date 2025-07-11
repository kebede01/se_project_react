import "./SideBar.css";
import avatar from "../../assets/myavatar.jpg";
const SideBar = ({ avatarName }) => {
  return (
    <section className="side-bar">
      <img
        src={avatar}
        alt={`image of ${avatarName}`}
        className="side-bar__avatar"
      />

      <p className="side-bar__avatar-name">{avatarName}</p>
    </section>
  );
};
export default SideBar;
