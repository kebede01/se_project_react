import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import{useContext} from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext";
const ClothesSection = ({
  clothingItems,
  handleCardClick,
  handleAddGarment,
}) => {

    const { currentUser } = useContext(CurrentUserContext)
  
  // Checking if the current user is the owner of the current clothing item
  
  
  // Creating a variable which you'll then set in `className` for the delete button

  return (
    <section className="clothes">
      <div className="clothes__heading">
        <p className="clothes-heading__title">Your Items</p>
        <button className="clothes-heading__btn" onClick={handleAddGarment}>
          + Add new
        </button>
      </div>

      <ul className="clothes__items">
        {clothingItems.map((item) => {
          const isOwn = item.owner !== currentUser._id;
        //  b/c i couldn't find one cloth, I used !== when it should be ===
          return isOwn ? (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
            />
          ) : "";
          
        })}
      </ul>
    </section>
  );
};
export default ClothesSection;
