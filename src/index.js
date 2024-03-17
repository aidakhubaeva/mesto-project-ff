import avatar from './images/avatar.jpg';
import './pages/index.css';
import { createCard } from './scripts/cards.js';
import { setUserInfo, getUserData, setUserAvatar, getInitialCards, deleteCardFromServer, createCardOnServer} from './scripts/api.js';
import { likeCard, dislikeCard } from './scripts/api.js';
import { isValid, enableValidation, clearValidation, toggleButtonState } from './scripts/validation.js';
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
  const avatarForm = document.querySelector('.popup__form[name="edit_avatar"]');
  const user = {}

  function handleDeleteButtonClick(event) {
    const cardElement = event.target.closest('.places__item');
    const _id = cardElement.getAttribute('data-card-id');
  
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

function setupAvatarEditButton() {
 const editButton = document.querySelector('.avatar__edit-button'); 
 const editAvatarPopup = document.querySelector('.popup_type_edit_avatar'); 

 editButton.addEventListener('click', function() {
     togglePopup(editAvatarPopup, true); 
 });
}
setupAvatarEditButton(); 

  const validationConfigAvatar = {
    formSelector: '.popup__form[name="edit_avatar"]',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

  const validationConfigProfile = {
      formSelector: '.popup__form[name="edit-profile"]',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
  };

  const validationConfigCard = {
      formSelector: '.popup__form[name="new-place"]',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
  };

  enableValidation(validationConfigAvatar);
  enableValidation(validationConfigProfile);
  enableValidation(validationConfigCard);

  avatarForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const submitButton = avatarForm.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';
  
    const avatarUrl = avatarForm.elements.link.value; 
    setUserAvatar(avatarUrl) 
      .then((responseData) => {
        document.querySelector('.profile__image').style.backgroundImage = `url('${responseData.avatar}')`; 
        togglePopup(document.querySelector('.popup_type_edit_avatar'), false); 
      })
      .catch((error) => {
        console.error("Ошибка при обновлении аватара:", error);
      })
      .finally(() => {
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
        }, 500); // Время в миллисекундах для задержки перед восстановлением текста кнопки
      });
  });

  function editProfile(e) {
    e.preventDefault();
    const form = e.target;
    const { name, description } = form.elements;
    const submitButton = form.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';
  
    setUserInfo(name.value, description.value)
      .then((updatedUserData) => {
        profileName.textContent = updatedUserData.name;
        profileAbout.textContent = updatedUserData.about;

        setTimeout(() => {
          submitButton.textContent = originalButtonText;
          togglePopup(editPopup, false);
        }, 500);
      })
      .catch((error) => {
        console.error("Ошибка обновления профиля:", error);
      });
  }

  function editButtonClick() {
    const { name, description } = formEditProfile.elements;
    name.value = profileName.textContent;
    description.value = profileAbout.textContent;

    clearValidation(formEditProfile, validationConfigProfile);
    const inputs = Array.from(formEditProfile.querySelectorAll(validationConfigProfile.inputSelector));
    inputs.forEach(input => {
        isValid(input, validationConfigProfile, formEditProfile);
    });

    const submitButton = formEditProfile.querySelector(validationConfigProfile.submitButtonSelector);
    toggleButtonState(inputs, submitButton, validationConfigProfile);
    togglePopup(editPopup, true);
}

  avatarImage.src = avatar;
  document.querySelector('.profile__image').style.backgroundImage = `url('${avatar}')`;

  function addCard(event) { 
    event.preventDefault(); 
    const form = event.target;
    const submitButton = form.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Добавление...';
    const name = form.elements['place-name'].value;
    const link = form.elements.link.value;
    
    createCardOnServer(name, link)
      .then((newCard) => {
        const cardElement = createCard(newCard.name, newCard.link, newCard.likes, newCard._id, user.id, newCard.owner._id, handleDeleteButtonClick, toggleLike, openImagePopup);
        placesList.prepend(cardElement);
        form.reset();
        togglePopup(addPopup, false);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении карточки:", error);
      })
      .finally(() => {
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
        }, 500);
      });
  }
      

  formAddCard.addEventListener('submit', addCard);

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


  function toggleLike(event) {
    const cardElement = event.target.closest('.places__item');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-count');
    const cardId = cardElement.getAttribute('data-card-id');
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    
    const updateLikes = isLiked ? dislikeCard(cardId) : likeCard(cardId);
  
    updateLikes.then((cardData) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = cardData.likes.length;
    })
    .catch((error) => {
      console.error("Ошибка при изменении статуса лайка:", error);
    });
  }

  function openImagePopup(text, link) {
      popupImage.src = link;
      popupImage.alt = text;
      popupCaption.textContent = text;
      togglePopup(imagePopup, true);
  }

  closeButtons.forEach(button => {
      button.addEventListener('click', closeButtonClick);
  });

  formEditProfile.addEventListener('submit', editProfile);
  document.addEventListener('click', documentClick);
  openAddPopupButton.addEventListener('click', () => {
    clearValidation(formAddCard, validationConfigCard, getUserData);
    togglePopup(addPopup, true);
  });

  openEditPopupButton.addEventListener('click', editButtonClick);
  

    // Init
  init();

  function init() {
    Promise.all([getUserData(), getInitialCards()])
    .then(([userData, initialCards]) => {
      user.id = userData._id
      profileName.textContent = userData.name;
      profileAbout.textContent = userData.about;
      document.querySelector('.profile__image').style.backgroundImage = `url('${userData.avatar}')`;
      const currentUserId = userData._id; 

      
        initialCards.forEach((card) => {
          const cardElement = createCard(
            card.name,
            card.link,
            card.likes,
            card._id,
            card.owner._id,
            currentUserId,
            handleDeleteButtonClick, 
            toggleLike, 
            openImagePopup
          );
          placesList.appendChild(cardElement);
        });
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }
});
