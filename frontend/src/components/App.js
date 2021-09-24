import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login'
import Register from './Register';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();

  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const[isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const[isLoading, setIsLoading] = React.useState(false);
  const[selectedCard, setSelectedCard] = React.useState(null);
  const[cards, setCards] = React.useState([]);
  const[selectedCardDelete, setSelectedCardDelete] = React.useState(null);
  const[currentUser, setCurrentUser] = React.useState({});
 
  const[loggedIn, setLoggedIn] = React.useState(false);
  const[isRegistered, setIsRegistered] = React.useState(false);
  const[isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const[email, setEmail] = React.useState("");

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);
  
  React.useEffect(() => {
    api.getUserInfo().then((res) => {
      setCurrentUser(res);
      console.log('DATA',res);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  React.useEffect(() => {
    api.getInitialCards().then((res) => {
      setCards(res)
      console.log('CARDS', res)
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  // Check user token
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.data.email);
        history.push("/");   
      })
      .catch((err) => console.log(err));
    }
  }, [history]);


  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCardDelete(card);
    setIsLoading(false);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCardDelete(null);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
        
    // Send a request to the API and getting the updated card data
    if(isLiked){
      api.removeLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {console.log(err)});
    } else {
      api.addLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {console.log(err)});
    }
  } 

  function handleCardDeleteSubmit(card){
    setIsLoading(true);
    api.removeCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
      closeAllPopups();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateUser(userData){
    setIsLoading(true);
    api.setUserInfo(userData)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar(avatar){
    setIsLoading(true);
    api.setUserAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlaceSubmit(cardData){
    setIsLoading(true);
    api.addCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleRegister (email, password) {
    if (!email || !password) {
      return;
    }
    auth.register(email, password)
    .then((res) => {
      if (res) {
        setIsRegistered(true);
        setIsInfoTooltipOpen(true);
        history.push('/signin');
      } else {
        setIsRegistered(false);
        setIsInfoTooltipOpen(true);
      }    
    })
    .catch((err) => {console.log(err)})
  }

  function handleLogin(email, password) {
    if(!email || !password) {
      return;
    }
    auth.authorize(email, password)
    .then((data) => {
      if (data.token) {
        setLoggedIn(true);
        setEmail(email);
        history.push('/main') 
      }     
    })
    .catch((err) => {console.log(err)})
  }

  function onLogout() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    history.push('/login');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

    <Switch>
      <ProtectedRoute path="/main" loggedIn={loggedIn}>
        <Header 
          linkText="Log out" 
          link="/signin"
          onClick={onLogout}
          loggedIn={loggedIn}
          email={email} />
        <Main 
          onLogout={onLogout}
          component={Main}
          onCardClick={handleCardClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          onClose={closeAllPopups}
          cards={cards}
          email={email}
        />
        <Footer />
      </ProtectedRoute>
      <Route path="/signin">
        <Login handleLogin={handleLogin} />
      </Route>
      <Route path="/signup">
      <Register handleRegister={handleRegister} />
      </Route>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
      </Route> 
    </Switch>

    <InfoTooltip
      isOpen={isInfoTooltipOpen}
      onClose={closeAllPopups} 
      isRegistered={isRegistered}
    />
        
    <AddPlacePopup
      isLoading={isLoading}
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onAddPlaceSubmit={handleAddPlaceSubmit}
    />

    <EditAvatarPopup 
      isLoading={isLoading}
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
    />

    <EditProfilePopup
      isLoading={isLoading}
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
    />

    <DeleteCardPopup
      isLoading={isLoading}
      isOpen={isDeleteCardPopupOpen}
      onClose={closeAllPopups}
      onCardDelete={handleCardDeleteSubmit}
      card={selectedCardDelete}
    />
        
    <ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
    />
    
    </CurrentUserContext.Provider>

  );
}

export default App;
