import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  handleCardClick,
  clothingItems,
  handleAddGarment,
  handleAddEditProfileModal,
  logOut,
  onCardLike,
}) => {
  return (
    <section className="profile">
      <SideBar
        handleAddEditProfileModal={handleAddEditProfileModal}
        className="profile__side-bar"
        logOut={logOut}
      />

      <ClothesSection
        className="profile__clothes"
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        handleAddGarment={handleAddGarment}
        onCardLike={onCardLike}
      />
    </section>
  );
};
export default Profile;
