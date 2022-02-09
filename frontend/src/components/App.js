import "./../index.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as apiAuth from "./../utils/api-auth";

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

  useEffect((_) => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(
    (_) => {
      if (loggedIn) {
        api
          .getUserData()
          .then((userData) => {
            setCurrentUser(userData);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [loggedIn]
  );

  const checkToken = (_) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      apiAuth
        .getContent(token)
        .then((res) => {
          if (res) {
            setUserEmail(res["email"]);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect((_) => {
    checkToken();
  }, []);

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((e) => console.log(e));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then((_) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (userInfo) => {
    api
      .refreshUserInfo(userInfo.name, userInfo.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setAvatar(avatar.link)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleEditAvatarClick = (_) => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceSubmit = (inputs) => {
    api
      .addCard(inputs.title, inputs.link)
      .then((cardInfo) => {
        console.log(cardInfo);
        setCards([cardInfo, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleEditProfileClick = (_) => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = (_) => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const handleInfoTooltipPopup = (_) => {
    setIsInfoToolTipOpen(true);
  };

  const closeAllPopups = (_) => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
  };

  const onSignOut = (_) => {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  const handleSignUp = (userData) => {
    apiAuth
      .signUp(userData)
      .then((_) => {
        setIsRegistered(true);
        handleInfoTooltipPopup();
        history.push("/signin");
      })
      .catch((err) => {
        alert('Данный email уже зарегистрирован!');
        setIsRegistered(false);
      });
  };

  const handleSignIn = (email, pass) => {
    apiAuth
      .signIn(email, pass)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push("/");
        api.getInitialCards().then((cards) => {
          setCards(cards);
        });
      })
      .catch((err) => {
        console.log(err);
        alert("Пользователь не найден!");
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header onSignOut={onSignOut} userEmail={userEmail} />
        <Switch>
          <Route exact path="/sign-in">
            <Login onSignIn={handleSignIn} />
          </Route>
          <Route exact path="/sign-up">
            <Register onSignUp={handleSignUp} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <InfoTooltip
          isRegistered={isRegistered}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
