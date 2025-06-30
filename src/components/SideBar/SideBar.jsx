import "./SideBar.css";
import avatar from "../../assets/myavatar.jpg";
const SideBar = ({ avatarName }) => {
  return (
    <section className="side-bar">
      <img src={avatar} className="side-bar__avatar" />

      <p className="side-bar__avatar-name">{avatarName}</p>
    </section>
  );
};
export default SideBar;
