// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

document.addEventListener('DOMContentLoaded', () => {
  const placesList = document.querySelector('.places__list');
  const cardTemplate = document.querySelector('#card-template').content;
  const addCardButton = document.querySelector('.profile__add-button');

  const imageUrls = [
      './images/card_1.jpg',
      './images/card_2.jpg',
      './images/card_3.jpg',
      './images/card_4.jpg',
      './images/card_5.jpg',
      './images/card_6.jpg'
  ];

  const cardTitles = [
    'Вдохновляйся',
    'Наслаждайся',
    'Путешествуй',
    'Преодолевай',
    'Влюбляйся',
    'Познавай',
  ]

  let currentImageIndex = 0; 


  function createCard() {
      const cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.card__image').src = imageUrls[currentImageIndex];
      cardElement.querySelector('.card__image').alt = 'Изображение ' + (currentImageIndex + 1);
      cardElement.querySelector('.card__title').textContent = cardTitles[currentImageIndex];

      cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
          this.closest('.places__item').remove();
      });

      currentImageIndex = (currentImageIndex + 1) % imageUrls.length;

      return cardElement;
  }

  addCardButton.addEventListener('click', () => {
      const cardElement = createCard();
      placesList.appendChild(cardElement);
  });
});