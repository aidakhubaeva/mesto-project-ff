// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

document.addEventListener('DOMContentLoaded', () => {
    const placesList = document.querySelector('.places__list');
    const cardTemplate = document.querySelector('#card-template').content;
    const addCardButton = document.querySelector('.profile__add-button');
  
    let currentImageIndex = 0; 
  
    function createCard() {
        const cardElement = cardTemplate.cloneNode(true);
        cardElement.querySelector('.card__image').src = initialCards[currentImageIndex].image;
        cardElement.querySelector('.card__image').alt = initialCards[currentImageIndex];
        cardElement.querySelector('.card__title').textContent = initialCards[currentImageIndex].text;
  
        cardElement.querySelector('.card__delete-button').addEventListener('click', (closest));

        function closest() {
            this.closest('.places__item').remove();
        }
        currentImageIndex = (currentImageIndex + 1) % initialCards.length;
  
        return cardElement;
    }
  
    addCardButton.addEventListener('click', () => {
        const cardElement = createCard();
        placesList.appendChild(cardElement);
    });
  });
  