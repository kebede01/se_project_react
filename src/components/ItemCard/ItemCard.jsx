import "./ItemCard.css";

function ItemCard({ item,  handleCardClick }) {
  const handleCallBack = () => {
    handleCardClick (item);
  };
  return (
    <li className="card" id={item._id}>
      <h2 className="card__name">{item.name}</h2>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__img"
        onClick={handleCallBack}
      />
    </li>
  );
}
export default ItemCard;
