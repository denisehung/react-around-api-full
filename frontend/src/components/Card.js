import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  ); 

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = (
    `card__heart-icon ${isLiked ? 'card__heart-icon_active' : ''}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  }
    
  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.onCardDelete(props.card);
  }   

  return(
    <div className="card">
      <button className={cardDeleteButtonClassName} onClick={handleDelete}></button>
      <img className="card__image" alt={props.card.name} src={props.card.link} onClick={handleClick} />
      <div className="card__textblock">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes-container">
          <button className={cardLikeButtonClassName} onClick={handleLike}></button>
          <p className="card__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;