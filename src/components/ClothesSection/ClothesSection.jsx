import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
const ClothesSection = ({
  clothingItems,
  handleCardClick,
  handleAddGarment,
  onCardLike,
}) => {
  const { currentUser } = useContext(CurrentUserContext);

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
          // Checking if the current user is the owner of the current clothing item
          const isOwn = item.owner === currentUser._id;

          return isOwn ? (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ) : (
            ""
          );
        })}
      </ul>
    </section>
  );
};
export default ClothesSection;
