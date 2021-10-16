import React, { useState, useEffect } from 'react';
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
  
  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const[isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const[selectedCard, setSelectedCard] = useState(null);
  const[cards, setCards] = useState([]);
  const[selectedCardDelete, setSelectedCardDelete] = useState(null);
  const[currentUser, setCurrentUser] = useState({});
 
  const[loggedIn, setLoggedIn] = useState(false);
  const[isRegistered, setIsRegistered] = useState(false);
  const[isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const[email, setEmail] = useState("");
  const[token, setToken] = useState(localStorage.getItem('jwt'));
  const history = useHistory();

  // Close popup with Escape button
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);

  // Check user token
  useEffect(() => {
    if (token) {
      auth.checkToken(token).then((res) => {
        setLoggedIn(true);
        setEmail(res.user.email);
        history.push("/");   
      })
      .catch((err) => console.log(err));
    }
  }, [history, token]);

  // Get current user info
  useEffect(() => {
      api.getUserInfo(token).then((res) => {
        setCurrentUser(res.user);
        console.log('USER',res.user);
      })
      .catch((err) => console.log(err));
  }, [token]);

  // Load cards from database
  useEffect(() => {
      api.getInitialCards(token).then((res) => {
        setCards(res.data);
        console.log('CARDS',res.data);
      })
      .catch(err => console.log(err))
  }, [token]);

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
    const isLiked = card.likes.some(i => i === currentUser._id);    
        
    // Send a request to the API and getting the updated card data
    if(isLiked){
      api
        .removeLike(card._id, token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {console.log(err)});
      } else {
        api
          .addLike(card._id, token)
          .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {console.log(err)});
        }
      } 

  function handleCardDeleteSubmit(card){
    setIsLoading(true);
    api
      .removeCard(card._id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {console.log(err)})
      .finally(() => {
        setIsLoading(false);
      });
    }

  function handleUpdateUser({ name, about }){
    setIsLoading(true);
    api
      .setUserInfo({ name, about }, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)})
      .finally(() => {
        setIsLoading(false);
      });
    }

  function handleUpdateAvatar({avatar}){
    setIsLoading(true);
    api
      .setUserAvatar(avatar, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {console.log(err)})
      .finally(() => {
        setIsLoading(false);
      });
    }

  function handleAddPlaceSubmit({ name, link }){
    setIsLoading(true);
    api
      .addCard({ name, link }, token)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
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
    auth
      .register(email, password)
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
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setToken(data.token);
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
    localStorage.removeItem('jwt');
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
