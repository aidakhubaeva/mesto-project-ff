import { likeCard, dislikeCard, deleteCardFromServer } from './api.js';

export function createCard(card, userId, currentUserId, handleDeleteButtonClick, toggleLike, openImagePopup) {
  const {name, link, likes, _id} = card
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  const imageElement = cardElement.querySelector('.card__image');
  imageElement.src = link;
  imageElement.alt = name;

  const likeCountElement = cardElement.querySelector('.card__like-count');
  likeCountElement.textContent = likes.length;

  const likeButton = cardElement.querySelector('.card__like-button');
  const isLiked = likes.some(user => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (userId === currentUserId) {
    deleteButton.addEventListener('click', (event) => handleDeleteButtonClick(event, _id));
    deleteButton.classList.add('card__delete-button_visible');
  } else {
    deleteButton.style.display = 'none';
  }
  
  cardElement.querySelector('.card__title').textContent = name;
  likeButton.addEventListener('click', () => toggleLike(likeButton, likeCountElement, _id));
  imageElement.addEventListener('click', () => openImagePopup(name, link));

  return cardElement;
};

export function toggleLike(likeButton, likeCounter, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  
  (isLiked ? dislikeCard(cardId) : likeCard(cardId))
    .then((cardData) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = cardData.likes.length;
    })
    .catch((error) => {
      console.error("Ошибка при изменении статуса лайка:", error);
    });
}

export function handleDeleteButtonClick(event, _id) {
  const cardElement = event.target.closest('.places__item');

  if (_id) {
    deleteCardFromServer(_id)
      .then(() => {
        cardElement.remove();
      })
      .catch((error) => {
        console.error('Ошибка при удалении карточки:', error);
      });
  } else {
    console.error('Не найден ID карточки.');
  }
}