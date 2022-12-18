// Данные формы
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

export {
    setting,
    // Формы
    profileForm,
    cardForm,
    avatarForm,

    // Inputs
    nameInput,
    jobInput,

    // Profile popup
    profileAvatar,
    popupEditButton,
    cardAddButton
}