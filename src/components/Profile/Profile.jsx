import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
const Profile = ({
  handleCardClick,
  clothingItems,
  handleAddGarment,
  handleAddEditProfileModal,
  avatarName,
  logOut,
}) => {
  return (
    <section className="profile">
      <SideBar
        handleAddEditProfileModal={handleAddEditProfileModal}
        avatarName={avatarName}
        className="profile__side-bar"
        logOut={logOut}
      />

      <ClothesSection
        className="profile__clothes"
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddGarment={handleAddGarment}
      />
    </section>
  );
};
export default Profile;
