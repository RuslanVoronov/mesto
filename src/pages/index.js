import './index.css';
import FormValidate from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/popupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

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
const profileAvatar = document.querySelector('.profile__avatar-overlay')
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
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

// рендер карточек
const cardList = new Section({
    renderer: (item) => {
        cardList.setItem(createCard(item));
    }
}, '.elements');

// Создание карточки
function createCard(item) {
    const cardElement = new Card(openImagePopup,
        {
            handleDeleteIconClick: (cardId, cardElement) => {
                popupWithConfirmation.open();
                popupWithConfirmation.setEventListeners(cardId, cardElement)
            }
        },
        {
            handleAddLike: (cardId) => {
                api.addLike(cardId)
                    .then((data) => {
                        cardElement.handleLikeCard(data);
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            }
        },
        {
            handleRemoveLike: (cardId) => {
                api.deleteLike(cardId)
                    .then((data) => {
                        cardId.handleLikeCard(data);
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            }
        }, userId, item, '.template');
    return cardElement.render();
}

// сбор информации
const profileInfo = new UserInfo({
    nameSelector: '.profile-info__title',
    jobSelector: '.profile-info__subtitle',
    avatarSelector: '.profile__avatar-image'
});

// Открытие попапа редактирования аватара
function openAvatarPopup() {
    profileEditAvatar.open()
    avatarFormValidate.resetValidation();
};

// Открытие Профиль Попапа
function openProfilePopup() {
    profileEditPopup.open();
    const userInfo = profileInfo.getUserInfo()
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.job;
    profileFormValidate.resetValidation();
};

// Открытие Image Popup
const openImagePopup = (name, link) => {
    popupImageLarge.open(name, link);
};

// Открытие Кард попап
function openCardPopup() {
    cardAddPopup.open();
    cardFormValidate.resetValidation();
};

// Экземпляр класса для попапа с подтверждение удаления
const popupWithConfirmation = new PopupWithConfirmation('#question-popup', {
    callbackSubmit: (cardId, cardElement) => {
        popupWithConfirmation.submitStatus('Удаление...')
        api.deleteCard(cardId)
            .then((res) => {
                popupWithConfirmation.close();
                cardElement.deleteCard(res);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupWithConfirmation.submitStatus('Да')
            })
    }
});

// Экземлпяр класса для большой картинки
const popupImageLarge = new PopupWithImage('#image-popup');
popupImageLarge.setEventListeners();

// Экземпляр класса для добавления карточки
const cardAddPopup = new PopupWithForm('#card-popup', {
    callbackFormSubmit: (data) => {
        cardAddPopup.submitStatus('Сохранение...')
        api.addNewCard(data)
            .then((res) => {
                cardList.setItem(createCard(res));
                cardAddPopup.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                cardAddPopup.submitStatus('Сохранить')
            })
    }
});
cardAddPopup.setEventListeners();

// Экземпляр для редактрования аватара
const profileEditAvatar = new PopupWithForm('#avatar-popup', {
    callbackFormSubmit: (data) => {
        profileEditAvatar.submitStatus('Сохранение...')
        api.updateAvatar(data)
            .then((res) => {
                profileInfo.setAvatar(res);
                profileEditAvatar.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                profileEditAvatar.submitStatus('Сохранить')
            })
    }
})
profileEditAvatar.setEventListeners();

// Экземпляр класса для редактирования профиля
const profileEditPopup = new PopupWithForm('#profile-popup', {
    callbackFormSubmit: (data) => {
        profileEditPopup.submitStatus('Сохранение...')
        api.updateUserInfo(data)
            .then((res) => {

                profileInfo.setUserInfo(res);
                profileEditPopup.close();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                profileEditPopup.submitStatus('Сохранить')
            })
    }
});
profileEditPopup.setEventListeners();

// Валидация
const profileFormValidate = new FormValidate(setting, profileForm)
profileFormValidate.enableValidation();
const cardFormValidate = new FormValidate(setting, cardForm);
cardFormValidate.enableValidation();
const avatarFormValidate = new FormValidate(setting, avatarForm);
avatarFormValidate.enableValidation();

// Слушатели
popupEditButton.addEventListener('click', openProfilePopup);
profileAvatar.addEventListener('click', openAvatarPopup);
cardAddButton.addEventListener('click', openCardPopup);