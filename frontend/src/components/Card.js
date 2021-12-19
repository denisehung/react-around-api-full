import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Check if current user is owner of current card
  const isOwn = props.card.owner === currentUser?._id;

  // Only display delete button if current user is owner of card
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  // Check if card was liked by current user
  const isLiked = props.card.likes?.some(i => i === currentUser?._id);

  // If card is liked, display active heart icon
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
          <p className="card__likes-counter">{props.card.likes?.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;