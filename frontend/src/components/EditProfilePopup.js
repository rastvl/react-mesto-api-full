import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = props => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //https://stackoverflow.com/a/47012342/17422766
  useEffect(_ => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about)
    }
  }, [currentUser, props.isOpen])

  const handleChange = evt => {
    evt.target.name === 'login' ? setName(evt.target.value) : setDescription(evt.target.value);
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    props.onUpdateUser({
        name,
        about: description,
    });
  }


  return (
    <PopupWithForm name="editProfile" isOpen={props.isOpen} title="Редактировать профиль" btnText="Сохранить"
        onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="popup__form-field">
        <input type="text" className="popup__input" name="login" placeholder="Имя" id="nameInput" minLength="2" maxLength="40"
            value={name || ''} onChange={handleChange} required />
        <span className="popup__input-error nameInput-error"></span>
      </label>
      <label className="popup__form-field">
        <input type="text" className="popup__input" name="job" placeholder="Деятельность" id="jobInput" minLength="2" maxLength="200"
            value={description || ''} onChange={handleChange} required />
        <span className="popup__input-error jobInput-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
