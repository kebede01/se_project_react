import "./ItemCard.css";
import cap from "../../assets/cap.svg";
import shorts from "../../assets/shorts.svg";
import sneakers from "../../assets/sneakers.svg";
import shirt from "../../assets/shirt.svg";
function ItemCard({ item, onCardClick }) {
  const handleCallBack = () => {
 onCardClick(item) 
  }
  return (
    <li className="card" id={item._id}>
      <h2 className="card__name">{item.name}</h2>
      <img src={item.link} alt={item.name} className="card__img" onClick={handleCallBack} />
    </li>
  );
}
export default ItemCard;
