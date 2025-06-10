import './ItemCard.css'
import cap from '../../assets/cap.svg'
import shorts from '../../assets/shorts.svg'
import sneakers from '../../assets/sneakers.svg'
import shirt from '../../assets/shirt.svg'
function ItemCard() {
  return (
    
        <section className="cards">
        <p className="cards__text">Today is 75° F / You may want to wear:</p>
         <ul className="cardItems">
        <li className="cardItems__list"><img src={cap } alt="" className="cardItems__list-img" /></li>
        <li className="cardItems__list"><img src={ shorts} alt="" className="cardItems__list-img" /></li>
        <li className="cardItems__list"><img src={sneakers } alt="" className="cardItems__list-img" /></li>
         <li className="cardItems__list"><img src={ shirt} alt="" className="cardItems__list-img"/></li>
      </ul>
      </section>
      

      
     
    
  )
}
export default ItemCard