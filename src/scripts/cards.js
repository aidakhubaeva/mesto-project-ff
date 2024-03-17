export const cardTemplate = document.querySelector('#card-template').content;

export const initialCards = [

];

export function createCard(text, link, likes, cardId, _id, currentUserId, handleDeleteButtonClick, toggleLike, openImagePopup) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardItemElement = cardElement.querySelector('.places__item');
  cardItemElement.setAttribute('data-card-id', cardId);
  const imageElement = cardElement.querySelector('.card__image');
  const likeCountElement = cardElement.querySelector('.card__like-count');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  console.log(_id, currentUserId)
  if (_id === currentUserId) { 
    deleteButton.classList.add('card__delete-button_visible');
    deleteButton.addEventListener('click', handleDeleteButtonClick);
  } else {
    deleteButton.style.display = 'none';
  }
  
  imageElement.src = link;
  imageElement.alt = text;
  likeCountElement.textContent = likes.length;

  const isLiked = likes.some(user => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  
  cardElement.querySelector('.card__title').textContent = text;
  likeButton.addEventListener('click', toggleLike);
  imageElement.addEventListener('click', () => openImagePopup(text, link));
  return cardElement;
};

