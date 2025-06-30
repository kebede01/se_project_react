import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
const ClothesSection = ({ clothingItems, weatherData, handleCardClick }) => {
  return (
    <section className="clothes">
      <div className="clothes__heading">
        <p className="clothes-heading__title">Your Items</p>
        <button className="clothes-heading__btn">+ Add new</button>
      </div>

      <ul className="clothes__items">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </section>
  );
};
export default ClothesSection;
