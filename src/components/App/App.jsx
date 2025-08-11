// External library imports
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Internal component imports
import "./App.css";
import { Header } from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Delete from "../Delete/Delete.jsx";
// Utility/helper function imports
import { filterWeatherData, weatherApiData } from "../../utils/WeatherApi.js";
import { APIkey, coordinates } from "../../utils/constants.js";
import { getItems, postItems, deleteCard } from "../../utils/api.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";


import Register from "../Register/RegisterModal.jsx"
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
    postItems( name, image, weatherType )
      .then((data) => {
        setClothingItems((prevValue) => {
          return [...prevValue, data];
        });
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleItemModalDeletButton = () => {
    setActiveModal("delete");
    // setSelectedCard(selectedCard);
  };

  const handleDeleteModalDeletButton = (selectedCard) => {
    // fetch to delete the clothing item on the server
    deleteCard(selectedCard)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddRegistration = () => {
    setActiveModal("register");
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
      .then(({ data }) => setClothingItems(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddGarment={handleAddGarment}
            onRegistration={handleAddRegistration}
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
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddGarment={handleAddGarment}
                />
              }
            />
          </Routes>

          <Footer name="Kebede Tekle" />
          <Delete
            activeModal={activeModal}
            onCloseModal={handleCloseModal}
            onDeleteModalDeletButton={handleDeleteModalDeletButton}
            selectedCard={selectedCard}
          />

          <ItemModal
            activeModal={activeModal}
            selectedCard={selectedCard}
            handleCloseModal={handleCloseModal}
            onItemModalDeletButton={handleItemModalDeletButton}
          />
          <AddItemModal
            // activeModal={activeModal}
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "add garment"}
            setClothingItems={setClothingItems}
            onSubmitAddItemModal={handleSubmitAddItemModal}
          />
          <Register
             onCloseModal={handleCloseModal}
            isOpen={activeModal === "register"}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
