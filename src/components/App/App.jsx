import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { APIkey, coordinates, defaultClothingItems } from "../../utils/constants.js";

import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, weatherApiData} from "../../utils/WeatherApi.js";

import Footer from '../Footer/Footer.jsx';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js'
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
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
 
  const [avatarName, setAvatarName] = useState("Kebede Tekle");

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
 
 const handleSubmitAddItemModal = (name, image, weatherType) => {
      const  newID = Math.max(...clothingItems.map((item) => item._id)) + 1;
      setClothingItems((prevValue) => {
       return [...prevValue, { _id: newID , name, weather: weatherType, link: image,  }]
    })
   handleCloseModal()
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
          <AddItemModal
            activeModal={activeModal}
            onCloseModal={handleCloseModal}
            isOpen={activeModal === "add garment"}
            setClothingItems={setClothingItems}
            onSubmitAddItemModal={handleSubmitAddItemModal } />
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
