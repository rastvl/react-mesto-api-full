import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

const EditAvatarPopup = props => {

  const avatarRef = useRef('');

  const handleSubmit = evt => {
    evt.preventDefault();

    props.onUpdateAvatar({
      link: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name="editAvatar" isOpen={props.isOpen} title="Редактировать аватар" btnText="Сохранить"
      onClose={props.onClose} onSubmit={handleSubmit} >

      <label className="popup__form-field">
        <input type="url" className="popup__input" name="avatarLink" placeholder="Ссылка" id="avaLinkInput" ref={avatarRef} required />
        <span className="popup__input-error avaLinkInput-error">sdfsdfsd</span>
      </label>

    </PopupWithForm>
  );
};

export default EditAvatarPopup;
