
const PopupWithForm = props => {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button type="button" className={`popup__close popup__close_${props.name}`} onClick={props.onClose}></button>
                <h2 className="popup__description">{props.title}</h2>
                <form className={`popup__form popup__form_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button type="submit" className="popup__submit" name={`${props.name}`}>
                        {`${props.btnText}`}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;