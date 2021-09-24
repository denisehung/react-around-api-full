import React from "react";

//Only open popup and return corresponding data if props.card (selectedCard) is true
function ImagePopup(props) {
  return(
    <div className={`popup popup_type_image ${props.card && 'popup_opened'}`}> 
      <div className="popup__wrapper">
        <button className="popup__close-button popup__close-button_type_image" type="button"
          aria-label="Close popup" onClick={props.onClose}></button>
        <img src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : '#'} className="popup__image" />
        <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;