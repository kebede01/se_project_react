// External library imports
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// Internal component imports
import "./App.css";
import { Header } from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Delete from "../Delete/Delete";
import Register from "../RegisterModal/RegisterModal";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import LogIn from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
// Utility/helper function imports
import { filterWeatherData, weatherApiData } from "../../utils/WeatherApi.js";
import { APIkey, coordinates } from "../../utils/constants.js";
import { getItems, postItems, deleteCard } from "../../utils/api.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import * as auth from "../../utils/auth.js";
import * as tokenValue from "../../utils/token.js";
import * as apiForLikeDislike from "../../utils/apiForLikeDislike.js";

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
  // The following four help toggle button type in 'ModalWithForm' component
  const openLogInModal = activeModal === "login";
  const openRegistrationModal = activeModal === "register";
  const openAddItemButton = activeModal === "add garment";
  const openEditProfileButton = activeModal === "edit profile";
  // The following functions help switch modal type
  const handleAddGarment = () => {
    setActiveModal("add garment");
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
  const handleCloseModal = () => {
    setActiveModal();
  };
  // This function switches modal type and takes the card data at the same time
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  //This switches temperature unit through out the components.
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  //This adds clothing item, taking data from the 'AddItemModal'
  const handleSubmitAddItemModal = (name, image, weatherType) => {
    const token = tokenValue.getToken();
    //POST request to the server to populate the database.It requires authorization 'token'
    postItems(name, image, weatherType, token)
      .then((res) => {
        setClothingItems((prevValue) => {
          return [...prevValue, res.data];
        });

        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // This takes to another modal after clicking the "delete" button in "ItemModal";
  const handleItemModalDeletButton = () => {
    setActiveModal("delete");
    setSelectedCard(selectedCard);
  };
  //This deletes clothing item, taking item-data from the modal
  const handleDeleteModalDeletButton = (selectedCard) => {
    const token = tokenValue.getToken();
    // fetch to 'DELETE' the clothing item on the server.It requires authorization token
    deleteCard(selectedCard, token)
      .then(() => {
        //Removing the deleted item from our clothing collection
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
  //The following takes data from the 'SIGN UP' process i.e RegisterModal
  const handleRegistration = (name, avatarUrl, email, password) => {
    //fetch to 'POST' to the server and populate our User collection
    auth
      .register(name, avatarUrl, email, password)
      .then(() => {
        console.log("Yes registered");
      })
      .catch(console.error);
  };
  //The following takes data from the 'SIGN IN' process i.e LoginModal
  const navigate = useNavigate();
  const handleLogIn = (email, password) => {
    if (!email || !password) {
      return;
    }
    //fetch to 'POST' to the server and we receive token along with user data
    auth
      .authorize(email, password)
      .then((data) => {
        tokenValue.setToken(data.token); //storing token in localStorage

        return auth.getUserInfo(data.token).then((userData) => {
          setIsLoggedIn(true);

          setCurrentUser(userData.data);
          navigate("/");
        });
      })
      .catch(console.error);
  };
  //This helps edit our user profile

  const handleEditProfile = (name, avatarUrl) => {
    if (!name || !avatarUrl) {
      return;
    }
    const token = tokenValue.getToken();
    //fetch to 'PATCH' request to the server.It requires token authorization
    auth
      .changeUserInfo(name, avatarUrl, token)
      .then(() => {
        // now we immediately update current user info;
        auth.getUserInfo(token).then((data) => {
          setCurrentUser(data.data);
        });
      })
      .catch(console.error);
  };

  // handle item card 'like' button
  const handleCardLike = ({ _id }, isLiked) => {
    const token = tokenValue.getToken();
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        apiForLikeDislike
          //fetch to 'PUT' request to the server.It requires token authorization
          .addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((prevValue) =>
              prevValue.map((item) =>
                item._id === _id ? updatedCard.data : item
              )
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        apiForLikeDislike
          //fetch to 'DELETE' request to the server.It requires token authorization
          .removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  // function to logout
  const logOut = () => {
    tokenValue.removeToken(); //removes token from the browser localStorage
    setIsLoggedIn(false);
    navigate("/");
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
              onAddLogIn={handleAddLogIn} //changes active modal type
              onRegistration={handleAddRegistration} //changes active modal type
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
                  <ProtectedRoute>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddGarment={handleAddGarment}
                      avatarName={currentUser.name}
                      handleAddEditProfileModal={handleAddEditProfileModal}
                      logOut={logOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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
              onRegistration={handleRegistration} //handles four input values on registration submit
              activeModal={activeModal}
              handleAddLogIn={handleAddLogIn} //changes active modal type
              openRegistrationModal={openRegistrationModal}
            />

            <LogIn
              buttonText="Log in"
              title="Login"
              onCloseModal={handleCloseModal}
              isOpen={activeModal === "login"}
              onLogIn={handleLogIn}
              activeModal={activeModal}
              handleAddRegistration={handleAddRegistration} //changes active modal type
              openLogInModal={openLogInModal}
            />
            <ProfileEditModal
              buttonText="Save changes"
              title="Edit profile"
              onCloseModal={handleCloseModal}
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
