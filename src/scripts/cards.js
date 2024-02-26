const cardTemplate = document.querySelector('#card-template').content;

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      text: "Архыз",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      text: "Челябинская область",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      text: "Иваново",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      text: "Камчатка",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      text: "Холмогорский район",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      text: "Байкал",
    }

];

export function createCard(text, link, handleDeleteButtonClick, toggleLike, openImagePopup) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector('.card__image');
  imageElement.src = link;
  imageElement.alt = text;
  cardElement.querySelector('.card__title').textContent = text;
  cardElement.querySelector('.card__delete-button').addEventListener('click', handleDeleteButtonClick);
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
  imageElement.addEventListener('click', () => {
      openImagePopup(text, link);
  });
  return cardElement;
};

