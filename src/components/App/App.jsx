import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "../Header/Header";
import Main from "../Main/Main";
import { APIkey, coordinates } from "../../utils/constants.js";

import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, weatherApiData } from "../../utils/WeatherApi.js";

import Footer from "../Footer/Footer.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems, postItems, deleteCard } from "../../utils/api.js";
import Delete from "../Delete/Delete.jsx";
function App() {
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: isWeatherDataLoaded ? 999 : "Loading...", C: 999 },
    city: "New York",
    isDay: false,
    condition: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleSubmitAddItemModal = (name, image, weatherType) => {
    postItems(name, image, weatherType).then((data) => {
      setClothingItems((prevValue) => {
        return [...prevValue, data];
      });
    });
    handleCloseModal();
  };

  const handleItemModalDeletButton = () => {
    setActiveModal("delete");
    setSelectedCard(selectedCard);
  };

  const handleDeleteModalDeletButton = (selectedCard) => {
    // fetch to delete the clothing item on the server
    deleteCard(selectedCard).then(() => {
      setClothingItems(
        clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        })
      );
      handleCloseModal();
    });
  };

  useEffect(() => {
    weatherApiData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddGarment={handleAddGarment}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <Footer name="Kebede Tekle" />
          <AddItemModal
            activeModal={activeModal}
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "add garment"}
            setClothingItems={setClothingItems}
            onSubmitAddItemModal={handleSubmitAddItemModal}
          />
          <ItemModal
            activeModal={activeModal}
            selectedCard={selectedCard}
            handleCloseModal={handleCloseModal}
            onItemModalDeletButton={handleItemModalDeletButton}
          />
          <Delete
            activeModal={activeModal}
            onCloseModal={handleCloseModal}
            onDeleteModalDeletButton={handleDeleteModalDeletButton}
            selectedCard={selectedCard}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
