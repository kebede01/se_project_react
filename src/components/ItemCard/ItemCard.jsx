import "./ItemCard.css";
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ItemCard({ item, handleCardClick, onCardLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  // we need to create a variable to keep track of whether a card is liked or not
  // const [alreadyLiked, setAlreadyLiked] = useState(isLiked);
  // how can we know whether a card is or is not liked?
  // we can tell if a card is liked by whether or not the currently logged in user's id is within the likes array

  const handleCallBack = () => {
    handleCardClick(item);
  };
  const handleClick = () => {
    onCardLike(item, isLiked); // we should pass that variable to the onCardLike function
  };
  useEffect(() => {
    if (item.likes.includes(currentUser._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [item.likes]);
  return (
    <li className="card" id={item._id}>
      <h2 className="card__name">{item.name}</h2>
      <button type="button" className="card__like-button" onClick={handleClick}>
        LIKE
      </button>
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
//  ♡
