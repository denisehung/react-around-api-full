import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const[name, setName] = React.useState(null);
  const[link, setLink] = React.useState(null);

  function handleChangeTitle(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }
    
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: name,
      link: link
    });
    setName('');
    setLink('');
  } 

  return(
    <PopupWithForm name="add-img" title="New Place" btnText={props.isLoading ? 'Saving...' : 'Create'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
      <label className="popup__form-field">
        <input type="text" className="popup__input popup__input_type_title" id="title-input" autoComplete="off" placeholder="Title" name="name" minLength="1" maxLength="30" value={name || ''} onChange={handleChangeTitle} required />
        <span id="title-input-error" className="popup__error"></span>
      </label>
      <label className="popup__form-field">
        <input type="url" className="popup__input popup__input_type_img" id="image-url-input" autoComplete="off" placeholder="Image URL" name="link" value={link || ''} onChange={handleChangeLink} required />
        <span id="image-url-input-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
   );
  }

export default AddPlacePopup;