import React from "react";
import SuccessIcon from '../images/success-icon.svg';
import FailureIcon from '../images/failure-icon.svg';

function InfoTooltip(props) {

  function handlePopupClick(e) {
    if (e.target.classList.contains('popup_opened')) {
      props.onClose();
    }
  }

  return(
    <div className={`popup popup_type_tooltip ${props.isOpen ? 'popup_opened' : '' }`} onClick={handlePopupClick}>
      <div className="popup__container">
        <button className="popup__close-button popup__close-button_type_form" type="button" aria-label="Close popup" onClick={props.onClose}></button>
        <div className="popup__form popup__form_type_tooltip">
          <img src={props.isRegistered ? SuccessIcon : FailureIcon} className="popup__tooltip-icon" alt="success icon" />
          <h2 className="popup__tooltip-text">{props.isRegistered ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.'}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;