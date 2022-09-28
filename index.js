// Popup
const popupObenButton = document.querySelector('.edit-button');
const popup = document.querySelector('.overlay');
const popupCloseButton = document.querySelector('.close-button');

popupToggle = function () {
    popup.classList.toggle('popup_opened');
};

popupObenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

// Редактирование профиля
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile-info__title');
let profileJob = document.querySelector('.profile-info__subtitle')
const saveButton = document.querySelector('.save-btn');

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);

console.log(formElement[0].value);
saveButton.addEventListener('click', formSubmitHandler);
saveButton.addEventListener('click', popupToggle);
