const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

export function togglePopup(popup, isOpen) {
    if (isOpen) {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', handleEscClose);
    } else {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleEscClose);
    }
}

export function handleEscClose(evt) { // определяет, была ли нажата клавиша
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            togglePopup(openedPopup, false);
        }
    }
}

export function openImagePopup(text, link) {
    popupImage.src = link;
    popupImage.alt = text;
    popupCaption.textContent = text;
    togglePopup(imagePopup, true);
}



