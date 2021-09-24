import React from "react";
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  } 

  return(
    <PopupWithForm name="delete" title="Are you sure?" btnText={props.isLoading ? 'Deleting...' : 'Yes'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
       
    </PopupWithForm>
  );
}

export default DeleteCardPopup;