import trash from "./../images/trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";
import { cardSelectors } from './../utils/domElements.js'

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${cardSelectors.cardTrashIconSelector} ${
      isOwn ? cardSelectors.cardTrashIconShow : ''
  }
  `;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `${cardSelectors.cardLikeBtn} ${isLiked ? cardSelectors.cardLikeBtnActive : ''}`;

  const handleCardClick = _ => {
    props.onCardClick(props.card);
  };

  const handleLikeClick = _ => {
    props.onCardLike(props.card);
  }

  const handleDeleteClick = _ => {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card" key={props.card._id}>
      <img className={cardDeleteButtonClassName} src={trash} alt="Корзина" onClick={handleDeleteClick} />
      <div
        className="card__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleCardClick}
      ></div>
      <div className="card__description">
        <p className="card__title">{props.card.name}</p>
        <div className="card__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <div className="card__like-counter">{props.card.likes.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
