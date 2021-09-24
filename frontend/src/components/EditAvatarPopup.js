import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value /* Input value is obtained by ref */
    })
  } 

  return(
    <PopupWithForm name="avatar" title="Change profile picture" btnText={props.isLoading ? 'Saving...' : 'Save'} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
      <label className="popup__form-field">
        <input type="url" className="popup__input popup__input_type_img" id="avatar-url-input" autoComplete="off" placeholder="Image URL" name="link" ref={avatarRef} required />
        <span id="avatar-url-input-error" className="popup__error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;