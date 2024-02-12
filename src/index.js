// import imageSrc from './image.png';

// function createImageElement() {
//   const img = document.createElement('img');
//   img.src = imageSrc; 
//   return img;
// }

// import './pages/index.css';
// import {initialCards} from './scripts/cards';

// const placesList = document.querySelector('.places__list');
// const cardTemplate = document.querySelector('#card-template').content;

// function closest() {
//     this.closest('.places__item').remove();
// }

// function createCard(text, image) {
//     const cardElement = cardTemplate.cloneNode(true);
//     cardElement.querySelector('.card__image').src = image;
//     cardElement.querySelector('.card__image').alt = text;
//     cardElement.querySelector('.card__title').textContent = text;
//     cardElement.querySelector('.card__delete-button').addEventListener('click', closest);
//     return cardElement;
// }

// initialCards.forEach((cardData) => {
//     const cardElement = createCard(cardData.text, cardData.image);
//     placesList.appendChild(cardElement);
// });



import avatar from './images/avatar.jpg';
import './pages/index.css';
import { initialCards } from './scripts/cards.js';


const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


function createImageElement(imageSrc) {
  const img = document.createElement('img');
  img.src = imageSrc;
  img.classList.add('card__image');
  return img;
}

function closest() {
  this.closest('.places__item').remove();
}

function createCard(text, imageSrc) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = createImageElement(imageSrc); 
  imageElement.alt = text; 
  
  const cardImageContainer = cardElement.querySelector('.card__image-container');
  if (cardImageContainer) {
    cardImageContainer.appendChild(imageElement);
  } else {
    cardElement.querySelector('.card__image').replaceWith(imageElement);
  }
  
  cardElement.querySelector('.card__title').textContent = text;
  cardElement.querySelector('.card__delete-button').addEventListener('click', closest);
  
  return cardElement;
}


initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData.text, cardData.image);
  placesList.appendChild(cardElement);
});

const avatarImage = new Image();
avatarImage.src = avatar;
document.querySelector('.profile__image').style.backgroundImage = `url('${avatar}')`;
