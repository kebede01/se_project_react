import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { APIkey } from "../../utils/constants.js";
import coordinates from "../../utils/constants.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import weatherApiData from "../../utils/WeatherApi.js";
import { filterWeatherData } from "../../utils/WeatherApi.js";
import { defaultClothingItems } from "../../utils/constants.js";
import Footer from '../Footer/Footer.jsx';
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: 96,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [name, setName] = useState("");
   const [image, setImage] = useState("");
  const handleAddGarment = () => {
    setActiveModal("add garment");
  };
  const handleCloseModal = () => {
    setActiveModal();
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };


  useEffect(() => {
    weatherApiData( coordinates , APIkey)
      .then((data) => {
        // Use the data here
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    
      <div className="page">
        <div className="page__content">
          <Header
            handleAddGarment={handleAddGarment}
            weatherData={weatherData}
          />
          <Main weatherData={weatherData} handleCardClick={handleCardClick}  clothingItems={clothingItems}/>
          <ModalWithForm
            buttonText="Add garment"
            title="New garment"
            activeModal={activeModal}
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "add garment"}
          >
            <label htmlFor="name" className="modal__label">
              Name
              <input
                id="name"
                type="text"
                className="modal__input"
                placeholder="Name"
              required
              name= "name"
               onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label htmlFor="imageUrl" className="modal__label">
              Image
              <input
                id="imageUrl"
                type="text"
                className="modal__input"
              placeholder=" Image URL"
              name="imageUrl"
              required
              onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">Select the weather type</legend>
              <label
                htmlFor="hot"
                className="modal__label modal__label_type-radio"
              >
                <input type="radio" id="hot" className="modal__radio-input" name="weather"/>
              <span className="modal__span">Hot</span>
              </label>

              <label
                htmlFor="cold"
                className="modal__label modal__label_type-radio"
              >
                <input type="radio" id="cold" className="modal__radio-input" name="weather"  />
               <span className="modal__span" >Cold</span>
              </label>

              <label
                htmlFor="warm"
                className="modal__label modal__label_type-radio"
              > 
                <input type="radio" id="warm" className="modal__radio-input" name="weather" />
               <span className="modal__span">Warm</span>
              </label>
            </fieldset>
          </ModalWithForm>
          <ItemModal
            activeModal={activeModal}
            selectedCard={selectedCard}
            // handleCardClick={handleCardClick}
            handleCloseModal={handleCloseModal}
          />
          <Footer/>
        </div>
      </div>
    
  );
}
export default App;
