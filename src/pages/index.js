import './index.css';
import FormValidate from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/popupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

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
const cardAddButton = document.querySelector('.profile__add-button');

// image popup
const imagePopupName = document.querySelector('.image-popup__name');
const imagePopupImage = document.querySelector('.image-popup__image');


const popupImageLarge = new PopupWithImage('#image-popup');
popupImageLarge.setEventListeners();



// Открытие Image Popup
const openImagePopup = (name, link) => {
    popupImageLarge.open(name, link);
};

// рендер карточек
const cardList = new Section({
    renderer: (item) => {
        const card = new Card(openImagePopup, item, '.template');
        cardList.setItem(card.render());
    }
}
    , '.elements');
cardList.renderItems(items);

// Валидация
const profileFormValidate = new FormValidate(setting, profileForm)
profileFormValidate.enableValidation();
const cardFormValidate = new FormValidate(setting, cardForm);
cardFormValidate.enableValidation();

// Создание карточки
function createCard(item) {
    const cardElement = new Card(openImagePopup, item, '.template');
    return cardElement.render();
}

// Экземпляр класса для добавления карточки
const cardAddPopup = new PopupWithForm('#card-popup', {
    callbackFormSubmit: () => {
        cardList.setItem(createCard({
            name: placeInput.value,
            link: linkInput.value
        }));
        cardAddPopup.close();
    }
});
cardAddPopup.setEventListeners();

// сбор информации
const profileInfo = new UserInfo('.profile-info__title', '.profile-info__subtitle');

// Экземпляр класса для редактирования профиля
const profileEditPopup = new PopupWithForm('#profile-popup', {
    callbackFormSubmit: (data) => {
        profileInfo.setUserInfo(data)
        profileEditPopup.close();
    }
});
profileEditPopup.setEventListeners();

// Слушатели
popupEditButton.addEventListener('click', function () {
    profileEditPopup.open();
    nameInput.setAttribute('value', profileInfo.getUserInfo().name);
    jobInput.setAttribute('value', profileInfo.getUserInfo().job);
});

cardAddButton.addEventListener('click', function () {
    cardAddPopup.open();
    cardFormValidate.resetValidation();
});
