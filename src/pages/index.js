import './index.css';
import FormValidate from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/popupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from '../components/Api';

const items = [
    {
        place: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        place: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        place: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        place: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        place: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        place: 'Байкал',
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
};

// Формы
const profileForm = document.querySelector('#profile-form');
const cardForm = document.querySelector('#card-form');

// Inputs
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

// Profile popup
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const popupEditButton = document.querySelector('.profile-info__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

// api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '8e75bdf3-a6dd-493a-8736-dd4d2d269086',
        'Content-Type': 'application/json'
    }
});



// Открытие Image Popup
const openImagePopup = (name, link) => {
    popupImageLarge.open(name, link);
};

// Открытие Профиль Попапа
function openProfilePopup() {
    profileEditPopup.open();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    profileFormValidate.resetValidation();
};

// Открытие Кард попап
function openCardPopup() {
    cardAddPopup.open();
    cardFormValidate.resetValidation();
};

// рендер карточек
const cardList = new Section({
    renderer: (item) => {
        const card = new Card(openImagePopup, item, '.template');
        cardList.setItem(card.render());
    }
}, '.elements');

// Создание карточки
function createCard(item) {
    const cardElement = new Card(openImagePopup, item, '.template');
    return cardElement.render();
}

// Валидация
const profileFormValidate = new FormValidate(setting, profileForm)
profileFormValidate.enableValidation();
const cardFormValidate = new FormValidate(setting, cardForm);
cardFormValidate.enableValidation();

// Экземлпяр класса для большой картинки
const popupImageLarge = new PopupWithImage('#image-popup');
popupImageLarge.setEventListeners();

// Экземпляр класса для добавления карточки
const cardAddPopup = new PopupWithForm('#card-popup', {
    callbackFormSubmit: (data) => {
        cardList.setItem(createCard(data));
        cardAddPopup.close();
    }
});
cardAddPopup.setEventListeners();

// сбор информации
const profileInfo = new UserInfo({
    nameSelector: '.profile-info__title',
    jobSelector: '.profile-info__subtitle',
    avatarSelector: '.profile__avatar'
});

// Экземпляр класса для редактирования профиля
const profileEditPopup = new PopupWithForm('#profile-popup', {
    callbackFormSubmit: (data) => {
        api.updateUserInfo(data);
        profileInfo.setUserInfo(data);
        profileEditPopup.close();
    }
});
profileEditPopup.setEventListeners();

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((value) => {
        profileInfo.setAvatar(value[0])
        profileInfo.setUserInfo(value[0])
        cardList.renderItems(value[1])
    })



// Слушатели
popupEditButton.addEventListener('click', openProfilePopup);
cardAddButton.addEventListener('click', openCardPopup);