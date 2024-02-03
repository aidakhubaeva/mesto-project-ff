const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function closest() {
    this.closest('.places__item').remove();
}

function createCard(text, image) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').src = image;
    cardElement.querySelector('.card__image').alt = text;
    cardElement.querySelector('.card__title').textContent = text;
    cardElement.querySelector('.card__delete-button').addEventListener('click', closest);
    return cardElement;
}

initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData.text, cardData.image);
    placesList.appendChild(cardElement);
});