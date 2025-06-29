import './Profile.css'
import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
const Profile = ({ weatherData, handleCardClick, clothingItems }) => {
  return (
    <section className='profile'>
      <SideBar className="profile__side-bar" />
      
      <ClothesSection className="profile__clothes" weatherData={weatherData} handleCardClick={handleCardClick}  clothingItems={clothingItems}/>
    </section>
  )
}
export default Profile;