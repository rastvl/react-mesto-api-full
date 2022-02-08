import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleChange = (evt) => {
    evt.target.name === "title"
      ? setTitle(evt.target.value)
      : setLink(evt.target.value);
  };

  useEffect(
    (_) => {
      if (props.isOpen) {
        setTitle("");
        setLink("");
      }
    },
    [props.isOpen]
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();

    props.onAddPlace({
      title,
      link,
    });
  };

  return (
    <PopupWithForm
      name="addPlace"
      isOpen={props.isOpen}
      title="Новое место"
      btnText="Создать"
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="text"
          className="popup__input"
          name="title"
          value={title}
          placeholder="Название"
          id="placeInput"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          required
        />
        <span className="popup__input-error placeInput-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="url"
          className="popup__input"
          value={link}
          name="link"
          placeholder="Ссылка на картинку"
          id="placeImgLink"
          onChange={handleChange}
          required
        />
        <span className="popup__input-error placeImgLink-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
