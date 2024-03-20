// export function togglePopup(popup, isOpen) {
//     if (isOpen) {
//         popup.classList.add('popup_is-opened');
//         document.addEventListener('keydown', handleEscClose);
//     } else {
//         popup.classList.remove('popup_is-opened');
//         document.removeEventListener('keydown', handleEscClose);
//     }
// }

// export function handleEscClose(evt) { // определяет, была ли нажата клавиша
//     if (evt.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_is-opened');
//         if (openedPopup) {
//             togglePopup(openedPopup, false);
//         }
//     }
// }


export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}

export function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

export function closePopupByOverlay(event) {
    if(event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}