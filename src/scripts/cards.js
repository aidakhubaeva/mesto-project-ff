import { openImagePopup } from "./modal";
const cardTemplate = document.querySelector('#card-template').content;

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      // image: cardImage1,
      text: "Архыз",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      // image: cardImage2,
      text: "Челябинская область",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      // image: cardImage3,
      text: "Иваново",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      // image: cardImage4,
      text: "Камчатка",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      // image: cardImage5,
      text: "Холмогорский район",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      // image: cardImage6,
      text: "Байкал",
    }

];

export function createCard(text, link) {
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

export function handleDeleteButtonClick(event) {
  event.target.closest('.places__item').remove();
};

export function toggleLike(event) {
  event.target.classList.toggle('card__like-button_is-active');
};