import signOk from "./../images/sign-ok.svg";
import signFailed from "./../images/sign-failed.svg"

const InfoTooltip = (props) => {
  return (
    <div className={`popup popup_tooltip ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content auth-status">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <img className="auth-status__image" src={props.isRegistered ? signOk : signFailed} alt="статус" />
        <p className="auth-status__text">
          {props.isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;