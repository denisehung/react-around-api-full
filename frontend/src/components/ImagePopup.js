import React from "react";

//Only open popup and return corresponding data if props.card (selectedCard) is true
function ImagePopup(props) {
  function handlePopupClick(e) {
    if (e.target.classList.contains('popup_opened')) {
      props.onClose();
    }
  }

  return(
    <div className={`popup popup_type_image ${props.card && 'popup_opened'}`} onClick={handlePopupClick}> 
      <div className="popup__wrapper">
        <button className="popup__close-button popup__close-button_type_image" type="button"
          aria-label="Close popup" onClick={props.onClose}></button>
        <img src={props.card ? props.card.link : null } alt={props.card ? props.card.name : null } className="popup__image" />
        <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;