import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { APIkey, coordinates, defaultClothingItems } from "../../utils/constants.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, weatherApiData} from "../../utils/WeatherApi.js";

import Footer from '../Footer/Footer.jsx';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js'
function App() {
 const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: {F: isWeatherDataLoaded ? 999 : "Loading...", C: 999},
    city: "New York",
    isDay: false,
    condition: ""
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [name, setName] = useState("");
  const [avatarName, setAvatarName] = useState("Kebede Tekle");
  const [image, setImage] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
 
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

  const handleToggleSwitchChange = () => {
  setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F")
  }

 useEffect(() => {
    weatherApiData( coordinates , APIkey)
      .then((data) => {
       const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
     })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
      <div className="page">
        <div className="page__content">
          <Header
          handleAddGarment={handleAddGarment}
          weatherData={weatherData}
          avatarName={avatarName}
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
              name="name"
               value={name}
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
              value={image}
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
            handleCloseModal={handleCloseModal}
          />
          <Footer/>
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
