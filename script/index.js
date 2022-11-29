import FormValidate from "./FormValidator.js";
import Card from "./Card.js";

const items = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    }
];
const setting = {
    form: '.popup__form',
    input: '.popup__input',
    submitButton: '.popup__save-button',
    inActiveButton: 'popup__save-button_invalid',
    inputError: 'popup__error',
    errorClass: 'popup__input_error_visible'
}

// Объявление Попапов
const imagePopup = document.querySelector('#image-popup');
const cardPopup = document.querySelector('#card-popup');
const profilePopup = document.querySelector('#profile-popup');

// Кнопки
const buttonCloseList = document.querySelectorAll('.popup__close-button');

// Формы
const profileForm = document.querySelector('#profile-form');
const cardForm = document.querySelector('#card-form');

// Область добавление карточек
const container = document.querySelector('.elements');

// Inputs
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

// Profile popup
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const popupEditButton = document.querySelector('.profile-info__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// image popup
const imagePopupName = document.querySelector('.image-popup__name');
const imagePopupImage = document.querySelector('.image-popup__image');

// Открытие Image Popup
const openImagePopup = (name, link) => {
    imagePopupImage.src = link;
    imagePopupName.textContent = name;
    imagePopupImage.alt = name;
    openPopup(imagePopup);
};

// рендер карточек
items.forEach((item) => {
    container.append(createCard(item));
});

// Валидация
const profileFormValidate = new FormValidate(setting, profilePopup)
profileFormValidate.enableValidation();
const cardFormValidate = new FormValidate(setting, cardPopup);
cardFormValidate.enableValidation();

// Открытие Профиль Попапа
function openProfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(profilePopup);
    profileFormValidate.resetValidation();
};

// Открытие Кард попап
function openCardPopup() {
    openPopup(cardPopup);
    cardForm.reset();
    cardFormValidate.resetValidation();
};

// сохранение Card Popup
function handleAddItem(evt) {
    evt.preventDefault();
    container.prepend(createCard({
        name: placeInput.value,
        link: linkInput.value
    }));
    closePopup(cardPopup);
};

// Создание карточки
function createCard(item) {
    const cardElement = new Card(openImagePopup, item, '.template');
    return cardElement.render();
}

// сохранение Profile Popup
function handleProfileProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
};

// Закрытие на крестик
buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closePopup(popup));
});

// Закрытие на Escape
function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

// Переключатели попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    };
}

// Слушатели
popupEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openCardPopup);

profileForm.addEventListener('submit', handleProfileProfileFormSubmit);
cardForm.addEventListener('submit', handleAddItem);

// Закрытие на оверлэй
profilePopup.addEventListener('mousedown', closePopupOnOverlay);
cardPopup.addEventListener('mousedown', closePopupOnOverlay);
imagePopup.addEventListener('mousedown', closePopupOnOverlay);
