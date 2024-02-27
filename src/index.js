import avatar from './images/avatar.jpg';
import './pages/index.css';
import { initialCards, createCard } from './scripts/cards.js';
import { togglePopup } from './scripts/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    const editPopup = document.querySelector('.popup_type_edit');
    const addPopup = document.querySelector('.popup_type_new-card');
    const openEditPopupButton = document.querySelector('.profile__edit-button');
    const openAddPopupButton = document.querySelector('.profile__add-button');
    const profileName = document.querySelector('.profile__title');
    const profileAbout = document.querySelector('.profile__description');
    const closeButtons = document.querySelectorAll('.popup__close');
    const placesList = document.querySelector('.places__list');
    const formEditProfile = editPopup.querySelector('form');
    const formAddCard = document.querySelector('.popup__form[name="new-place"]');
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    const avatarImage = new Image();

    function editProfile(e) { 
        e.preventDefault(); 
        const form = e.target
        const {name, description} = form.elements
        profileName.textContent = name.value
        profileAbout.textContent = description.value
        togglePopup(editPopup, false);
    }

    function addCard(event) { 
        event.preventDefault(); 
        const name = event.target.elements['place-name'].value;
        const link = event.target.elements.link.value;
        const cardElement = createCard(name, link, handleDeleteButtonClick, toggleLike, openImagePopup);
        placesList.prepend(cardElement);
        event.target.reset();
        togglePopup(addPopup, false);
    }

    function editButtonClick() {
        togglePopup(editPopup, true);
        const { name, description } = formEditProfile.elements;
        name.value = profileName.textContent;
        description.value = profileAbout.textContent;
    }

    function closeButtonClick(event) {
        const button = event.currentTarget; 
        const popup = button.closest('.popup');
        togglePopup(popup, false);
    }   

    function documentClick(evt) {
        if (evt.target.classList.contains('popup')) {
            togglePopup(evt.target, false);
        }
        if (evt.target.closest('.popup__content')) {
            evt.stopPropagation();
        }
    }

    function handleDeleteButtonClick(event) {
        event.target.closest('.places__item').remove();
    };
  
    function toggleLike(event) {
        event.target.classList.toggle('card__like-button_is-active');
    };

    function openImagePopup(text, link) {
        popupImage.src = link;
        popupImage.alt = text;
        popupCaption.textContent = text;
        togglePopup(imagePopup, true);
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeButtonClick);
    });

    document.addEventListener('click', documentClick);
    openAddPopupButton.addEventListener('click', () => togglePopup(addPopup, true));
    openEditPopupButton.addEventListener('click', editButtonClick);
    formEditProfile.addEventListener('submit', editProfile);
    formAddCard.addEventListener('submit', addCard);

    // Init
    initialCards.forEach((cardData) => {
        const cardElement = createCard(cardData.text, cardData.link, handleDeleteButtonClick, toggleLike, openImagePopup);
        placesList.appendChild(cardElement);
    });

    avatarImage.src = avatar;
    document.querySelector('.profile__image').style.backgroundImage = `url('${avatar}')`;
});