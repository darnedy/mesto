const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoWindow = document.querySelector('.popup-show-photo');

const openPopupProfile = document.querySelector('.profile__edit-button');
const openPopupPhoto = document.querySelector('.profile__add-button');

const closePopupProfile = document.querySelector('.popup__close_profile');
const closePopupPhoto = document.querySelector('.popup__close_photo');
const closePopupPhotoWindow = document.querySelector('.popup__close_window');

const formProfile = document.querySelector('.popup__form_profile');
const formPhoto = document.querySelector('.popup__form_photo');

const formPhotoTitle = document.querySelector('.popup__input_type_title');
const formPhotoUrl = document.querySelector('.popup__input_type_photo');

const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__input_type_name');
const descriptionInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const photoWindow = popupPhotoWindow.querySelector('.popup__photo');
const captionWindow = popupPhotoWindow.querySelector('.popup__caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

// Форма добавления фотографий

const photoTemplate = document.querySelector('#photo-grid-template').content.querySelector('.photo-grid__element');
const photoContainer = document.querySelector('.photo-grid');

const handlerLike = (evt) => {
  evt.target.closest('.photo-grid__like').classList.toggle('photo-grid__like_active');
};

const handlerDelete = (evt) => {
  evt.target.closest('.photo-grid__element').remove();
};

const showPhotoCard = (name,link) => {
  photoWindow.src = link;
  photoWindow.alt = name;
  captionWindow.textContent = name;
  openPopup(popupPhotoWindow);
};

const generatePhotoCard = (photoCard) => {
  const newPhotoCard = photoTemplate.cloneNode(true);

  const titlePhotoCard = newPhotoCard.querySelector('.photo-grid__title');
  titlePhotoCard.textContent = photoCard.name;

  const urlPhotoCard = newPhotoCard.querySelector('.photo-grid__pic');
  urlPhotoCard.src = photoCard.link;
  urlPhotoCard.alt = photoCard.name;
  urlPhotoCard.addEventListener('click', () => showPhotoCard(photoCard.name,photoCard.link) );

  const likeButton = newPhotoCard.querySelector('.photo-grid__like');
  likeButton.addEventListener('click', handlerLike);

  const deleteButton = newPhotoCard.querySelector('.photo-grid__trash');
  deleteButton.addEventListener('click', handlerDelete);

  return newPhotoCard;
}

const renderPhoto = (photoCard) => {
  photoContainer.prepend(generatePhotoCard(photoCard));
};

initialCards.forEach((photoCard) => renderPhoto(photoCard));

function handlePhotoFormSubmit (evt) {
  evt.preventDefault();
  renderPhoto({name: formPhotoTitle.value, link: formPhotoUrl.value});
  formPhotoTitle.value = '';
  formPhotoUrl.value = '';
  closePopup(popupPhoto);
};

// Форма Профиля

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                            
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileDescription.textContent =descriptionInput.value;
  closePopup(popupProfile);
};

// Функция закрытия попапа через Esc или клик по Оверлею
function handleEscClosePopup (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


// Функции Открыть/Закрыть
function openPopup(popupCurrent) {
  popupCurrent.classList.add('popup_opened');

  document.addEventListener('keydown', handleEscClosePopup);
};

function closePopup(popupCurrent) {
  popupCurrent.classList.remove('popup_opened');

  document.removeEventListener('keydown', handleEscClosePopup);
};

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
});

enableValidation(obj);


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleProfileFormSubmit); 
openPopupProfile.addEventListener('click', () => { nameInput.value = profileName.textContent; descriptionInput.value = profileDescription.textContent; openPopup(popupProfile);} );
openPopupPhoto.addEventListener('click', () => { formPhotoTitle.value = ''; formPhotoUrl.value = ''; openPopup(popupPhoto)} );
formPhoto.addEventListener('submit', handlePhotoFormSubmit); 

