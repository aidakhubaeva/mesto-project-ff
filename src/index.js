
import './pages/index.css';
import { createCard, toggleLike, handleDeleteButtonClick } from './scripts/card.js';
import { setUserInfo, getUserData, setUserAvatar, getInitialCards, createCardOnServer} from './scripts/api.js';
import { enableValidation, clearValidation, disableButton } from './scripts/validation.js';
import { openPopup, closePopup, closePopupByOverlay } from './scripts/modal.js';

  const editPopup = document.querySelector('.popup_type_edit');
  const addPopup = document.querySelector('.popup_type_new-card');
  const openEditPopupButton = document.querySelector('.profile__edit-button');
  const openAddPopupButton = document.querySelector('.profile__add-button');
  const profileName = document.querySelector('.profile__title');
  const profileAbout = document.querySelector('.profile__description');
  const closeButtons = document.querySelectorAll('.popup__close');
  const placesList = document.querySelector('.places__list');
  const formEditProfile = editPopup.querySelector('form');
  const formAddCard = addPopup.querySelector('.popup__form[name="new-place"]');
  const imagePopup = document.querySelector('.popup_type_image');
  const popupImage = imagePopup.querySelector('.popup__image');
  const profileImage = document.querySelector('.profile__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  const editAvatarPopup = document.querySelector('.popup_type_edit_avatar');
  const avatarForm = editAvatarPopup.querySelector('.popup__form[name="edit_avatar"]');
  const submitButton = avatarForm.querySelector('.popup__button');
  const popups = document.querySelectorAll('.popup');
  const user = {}

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

  enableValidation(validationConfig);

  avatarForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const avatarUrl = avatarForm.elements.link.value;
    setUserAvatar(avatarUrl)
      .then((responseData) => {
        profileImage.style.backgroundImage = `url('${responseData.avatar}')`; 
        closePopup(editAvatarPopup);
        avatarForm.reset()
        disableButton(submitButton, validationConfig)
      })
      .catch((error) => {
        console.error("Ошибка при обновлении аватара:", error);
      })
      .finally(() => {
        submitButton.textContent = originalButtonText;
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
        closePopup(editPopup);
        disableButton(submitButton, validationConfig)
      })
      .catch((error) => {
        console.error("Ошибка обновления профиля:", error);
      })
      .finally(() => {
        submitButton.textContent = originalButtonText;
      });
    };

    function addCard(event) { 
      event.preventDefault(); 
      const submitButton = formAddCard.querySelector('.popup__button');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Добавление...';
      const name = formAddCard.elements['place-name'].value;
      const link = formAddCard.elements.link.value;
      
      createCardOnServer(name, link)
        .then((newCard) => {
          const cardElement = createCard(newCard, user.id, newCard.owner._id, handleDeleteButtonClick, toggleLike, openImagePopup);
          placesList.prepend(cardElement);
          formAddCard.reset();
          closePopup(addPopup);
          disableButton(submitButton, validationConfig)
        })
          .catch((error) => {
            console.error("Ошибка при добавлении карточки:", error);
          })
          .finally(() => {
              submitButton.textContent = originalButtonText;
            });
        };

    function setupAvatarEditButton() {
      const editButton = document.querySelector('.avatar__edit-button');
         function openEditAvatarPopup() {
             openPopup(editAvatarPopup);
        }
     editButton.addEventListener('click', openEditAvatarPopup);
  }

setupAvatarEditButton(); 

    function editButtonClick() {
      const { name, description } = formEditProfile.elements;
      name.value = profileName.textContent;
      description.value = profileAbout.textContent;

      clearValidation(formEditProfile, validationConfig);
      openPopup(editPopup);
    }

    formAddCard.addEventListener('submit', addCard);

    function openImagePopup(text, link) {
      popupImage.src = link;
      popupImage.alt = text;
      popupCaption.textContent = text;
      openPopup(imagePopup);
    }

    function closeButtonClick(event) {
      const button = event.currentTarget; 
      const popup = button.closest('.popup');
      closePopup(popup); 
    }

    closeButtons.forEach(button => {
      button.addEventListener('click', closeButtonClick);
    });

    popups.forEach(popup => {
      popup.addEventListener('click', event => {
        if (event.target === event.currentTarget) {
          closePopupByOverlay(event); 
        }
      });
    });

  openEditPopupButton.addEventListener('click', editButtonClick);
  formEditProfile.addEventListener('submit', editProfile);
  openAddPopupButton.addEventListener('click', () => {
    openPopup(addPopup, true);
  });

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
              card,
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
