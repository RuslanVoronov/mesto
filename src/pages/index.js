import './index.css';
import FormValidate from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/popupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from '../components/Api';
import Popup from '../components/Popup';

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
const avatarForm = document.querySelector('#avatar-form');

// Inputs
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

// Profile popup
const profileName = document.querySelector('.profile-info__title');
const profileJob = document.querySelector('.profile-info__subtitle');
const profileAvatar = document.querySelector('.profile__avatar')
const popupEditButton = document.querySelector('.profile-info__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

// кнопки


// api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '8e75bdf3-a6dd-493a-8736-dd4d2d269086',
        'Content-Type': 'application/json'
    }
});

let userId;

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((value) => {
        userId = value[0]._id;
        profileInfo.setAvatar(value[0])
        profileInfo.setUserInfo(value[0])
        cardList.renderItems(value[1])
    })

// Открытие Image Popup
const openImagePopup = (name, link) => {
    popupImageLarge.open(name, link);
};
// function callbackDelete {

// }

function handleDeleteIconClick(cardId) {
    questionPopup.open();
    const questionPopupButton = document.querySelector('#question-btn')
    questionPopupButton.addEventListener('click',
        api.deleteCard(cardId)
            .then(() => {
                questionPopup.close();
                cardElement.deleteCard();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    );
}

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

function openQuestionPopup() {
    questionPopup.open();
}

// рендер карточек
const cardList = new Section({
    renderer: (item) => {
        const card = new Card(openImagePopup, handleDeleteIconClick, openQuestionPopup, userId, item, '.template');
        cardList.setItem(card.render());
    }
}, '.elements');

// Создание карточки
function createCard(item) {
    const cardElement = new Card(openImagePopup, handleDeleteIconClick, openQuestionPopup, userId, item, '.template');
    return cardElement.render();
}

// Валидация
const profileFormValidate = new FormValidate(setting, profileForm)
profileFormValidate.enableValidation();
const cardFormValidate = new FormValidate(setting, cardForm);
cardFormValidate.enableValidation();
const avatarFormValidate = new FormValidate(setting, avatarForm);
avatarFormValidate.enableValidation();

// Экземлпяр класса для большой картинки
const popupImageLarge = new PopupWithImage('#image-popup');
popupImageLarge.setEventListeners();

// question popup
const questionPopup = new Popup('#question-popup');
questionPopup.setEventListeners();

// Экземпляр класса для добавления карточки
const cardAddPopup = new PopupWithForm('#card-popup', {
    callbackFormSubmit: (data) => {
        api.addNewCard(data)
            .then((res) => {
                cardList.setItem(createCard(res));
                cardAddPopup.close();
            })
    }
});
cardAddPopup.setEventListeners();

// сбор информации
const profileInfo = new UserInfo({
    nameSelector: '.profile-info__title',
    jobSelector: '.profile-info__subtitle',
    avatarSelector: '.profile__avatar'
});

// Открытие попапа редактирования аватара
function openAvatarPopup() {
    profileEditAvatar.open()
    avatarFormValidate.resetValidation();
};

// Экземпляр для редактрования аватара
const profileEditAvatar = new PopupWithForm('#avatar-popup', {
    callbackFormSubmit: (data) => {
        api.updateAvatar(data)
            .then((res) => {
                profileInfo.setAvatar(res);
                profileEditAvatar.close();
            })
    }
})
profileEditAvatar.setEventListeners();

// Экземпляр класса для редактирования профиля
const profileEditPopup = new PopupWithForm('#profile-popup', {
    callbackFormSubmit: (data) => {
        api.updateUserInfo(data)
            .then((res) => {
                profileInfo.setUserInfo(res);
                profileEditPopup.close();
            })

    }
});
profileEditPopup.setEventListeners();





// Слушатели
popupEditButton.addEventListener('click', openProfilePopup);
profileAvatar.addEventListener('click', openAvatarPopup);
cardAddButton.addEventListener('click', openCardPopup);