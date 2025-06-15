import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import {
  defaultClothingItems,
  APIkey,
  coordinates,
} from "../../utils/constants.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import WeatherApi from "../../utils/WeatherApi.js";
import { filterWeatherData } from "../../utils/WeatherApi.js";
import Footer from '../Footer/Footer.jsx';
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: 96,
  });
  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = useState({});
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
    WeatherApi({ coordinates }, APIkey)
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
    <>
      <div className="page">
        <div className="page__content">
          <Header
            handleAddGarment={handleAddGarment}
            weatherData={weatherData}
          />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <ModalWithForm
            buttonText="Add garment"
            title="New garment"
            activeModal={activeModal}
            handleCloseModal={handleCloseModal}
          >
            <label htmlFor="name" className="modal__label">
              Name
              <input
                id="name"
                type="text"
                className="modal__input"
                placeholder="Name"
                required
              />
            </label>

            <label htmlFor="imageUrl" className="modal__label">
              Image
              <input
                id="imageUrl"
                type="text"
                className="modal__input"
                placeholder=" Image URL"
                required
              />
            </label>
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">Select the weather type</legend>
              <label
                htmlFor="hot"
                className="modal__label modal__label_type-radio"
              >
                <input type="radio" id="hot" className="modal__radio-input" />{" "}
                Hot
              </label>

              <label
                htmlFor="cold"
                className="modal__label modal__label_type-radio"
              >
                <input type="radio" id="cold" className="modal__radio-input" />{" "}
                Cold
              </label>

              <label
                htmlFor="warm"
                className="modal__label modal__label_type-radio"
              > 
                <input type="radio" id="warm" className="modal__radio-input" />{" "}
               Warm
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
    </>
  );
}
export default App;
