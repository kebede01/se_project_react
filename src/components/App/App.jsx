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
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Register from "../RegisterModal/RegisterModal.jsx";
import * as auth from "../../utils/auth.js";
import LogIn from "../LoginModal/LoginModal.jsx";
import * as tokenValue from "../../utils/token.js";
import * as apiForLikeDislike from "../../utils/apiForLikeDislike.js";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal.jsx";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "kebede ",
    email: "example@gmail.com",
  });

  const openLogInButton = activeModal === "login";
  const openRegButton = activeModal === "register";
  const openAddItemButton = activeModal === "add garment";
  const openEditProfileButton = activeModal === "edit profile";

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

  const handleAddEditProfileModal = () => {
    setActiveModal("edit profile");
  };

  const handleAddRegistration = () => {
    setActiveModal("register");
  };

  const handleAddLogIn = () => {
    setActiveModal("login");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleSubmitAddItemModal = (name, image, weatherType) => {
    const token = tokenValue.getToken();
    postItems(name, image, weatherType, token)
      .then((data) => {
        setClothingItems((prevValue) => {
          return [...prevValue, data.data];
        });
        console.log(clothingItems);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleItemModalDeletButton = () => {
    setActiveModal("delete");
    setSelectedCard(selectedCard);
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

  const handleRegistration = (name, password, email, avatarUrl) => {
    auth
      .register(name, password, email, avatarUrl)
      .then(() => {
        console.log("Yes registered");
      })
      .catch(console.error);
  };

  const handleLogIn = (email, password) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)

      .then((data) => {
        tokenValue.setToken(data.token);
        setIsLoggedIn(true);

        setCurrentUser(data.data);
        console.log(currentUser);
      })

      .catch(console.error);
  };

  const handleEditProfile = (name, avatarUrl) => {
    if (!name || !avatarUrl) {
      return;
    }
    const token = tokenValue.getToken();
    auth
      .changeUserInfo(name, avatarUrl, token)
      .then(() => {
        console.log("Profile Changed");
      })
      .catch(console.error);
  };

  // handle card like property of clothing items
  const handleCardLike = ({ _id }, isLiked) => {
    const token = tokenValue.getToken();
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        apiForLikeDislike
          // the first argument is the card's id
          .addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        apiForLikeDislike
          // the first argument is the card's id
          .removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };
  // how to request for a particular cloth item;
  // useEffect(() => {
  //    const token = tokenValue.getToken();
  //   getClothItem("689cddee74e082f4dd8bf16d", token)
  //     .then((data) => {
  //       console.log(`The clothItem is : ${JSON.stringify(data)}`);
  //   })
  // })

  // function to logout
  const logOut = () => {
    tokenValue.removeToken();
    setIsLoggedIn(false);
    setActiveModal("login");
    console.log("You have logged out successfully");
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

  useEffect(() => {
    const jwt = tokenValue.getToken();
    if (!jwt) {
      return;
    }

    auth
      .getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data.data);
        console.log(currentUser);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddGarment={handleAddGarment}
              onAddLogIn={handleAddLogIn}
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
                    onCardLike={handleCardLike}
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
                    avatarName={currentUser.name}
                    handleAddEditProfileModal={handleAddEditProfileModal}
                    logOut={logOut}
                    onCardLike={handleCardLike}
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
              buttonText="Add garment"
              title="New garment"
              onCloseModal={handleCloseModal}
              isOpen={activeModal === "add garment"}
              openAddItemButton={openAddItemButton}
              setClothingItems={setClothingItems}
              onSubmitAddItemModal={handleSubmitAddItemModal}
            />
            <Register
              buttonText="Sign up"
              title="Register"
              onCloseModal={handleCloseModal}
              isOpen={activeModal === "register"}
              onRegistration={handleRegistration}
              activeModal={activeModal}
              handleAddLogIn={handleAddLogIn}
              openRegButton={openRegButton}
            />

            <LogIn
              buttonText="Sign in"
              title="Login"
              onCloseModal={handleCloseModal}
              isOpen={activeModal === "login"}
              onLogIn={handleLogIn}
              activeModal={activeModal}
              handleAddRegistration={handleAddRegistration}
              openLogInButton={openLogInButton}
            />
            <ProfileEditModal
              buttonText="Edit profile"
              title="Edit profile"
              onCloseModal={handleCloseModal}
              // isOpen={activeModal === "edit profile"}
              isOpen={openEditProfileButton}
              onSubmitEditModal={handleEditProfile}
              openEditProfileButton={openEditProfileButton}
            />
          </div>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;
