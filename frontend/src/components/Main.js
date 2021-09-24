import React from "react";
import Card from './Card';
// import Header from './Header'
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__details">
            <div className="profile__image-container">
              <div className="profile__image-overlay" onClick={props.onEditAvatarClick}></div>
              <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
            </div>
            <div className="profile__description">
              <div className="profile__name-wrapper">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit-button" type="button" aria-label="Edit profile" onClick={props.onEditProfileClick}></button>
              </div>
              <p className="profile__about">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" aria-label="Add image" onClick={props.onAddPlaceClick}></button>
        </section>

       
        <section className="image-grid">
          {props.cards.map(card => (
            <Card 
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;