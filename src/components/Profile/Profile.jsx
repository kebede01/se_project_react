import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
const Profile = ({ handleCardClick, clothingItems, handleAddGarment }) => {
  return (
    <section className="profile">
      <SideBar className="profile__side-bar" avatarName={"kebede tekle"} />

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
