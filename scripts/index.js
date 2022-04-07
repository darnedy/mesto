const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__edit-button');
const closePopup = popup.querySelector('.popup__close');

let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_type_name');
let descriptionInput = formElement.querySelector('.popup__input_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

// function togglePopup() {
//     popup.classList.toggle('popup_opened') 
// };

// openPopup.addEventListener('click',togglePopup);

// closePopup.addEventListener('click',togglePopup);

function popupOpen() {
    popup.classList.add('popup_opened');
  
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
  
  function popupClose() {
    popup.classList.remove('popup_opened');
  }


// let formElement = popup.querySelector('.popup__container');
// let nameInput = formElement.querySelector('.popup__input_type_name');
// let descriptionInput = formElement.querySelector('.popup__input_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let name = nameInput.value;
    let description = descriptionInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    // let profileName = document.querySelector('.profile__name');
    // let profileDescription = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileDescription.textContent = description;

    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
openPopup.addEventListener('click',popupOpen);
closePopup.addEventListener('click',popupClose);