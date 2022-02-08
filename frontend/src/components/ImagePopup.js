

const ImagePopup = props => {
    return (
        <div className={`popup popup_place-pic ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content popup__content_place-pic">
                <figure className="place-pic">
                    <button type="button" className="popup__close popup__close_place-pic" onClick={props.onClose}></button>
                    <img className="place-pic__show" alt={`Фото места ${props.card.name}`} src={props.card.link}/>
                    <figcaption className="place-pic__caption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;