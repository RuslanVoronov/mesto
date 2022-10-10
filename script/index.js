// Переменные
const popupEditButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.popup');
const saveButton = document.querySelector('.popup__save-button');
const popupCloseButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile-info__title');
let profileJob = document.querySelector('.profile-info__subtitle');

// Add card popup
const addCardPopup = document.querySelector('.popup_add-card');
const cardPopupCloseButton = document.querySelector('.popup__close-button_add-card');
const addButton = document.querySelector('.profile__add-button');
const cardPopupSaveButton = document.querySelector('.popup__save-button_add-card');
let placeInput = document.querySelector('.popup__input_type_place');
let linkInput = document.querySelector('.popup__input_type_link');

const handleAddItem = () => {
    const item = createItemNode(placeInput.value, linkInput.value);
    container.prepend(item);
    placeInput.value = '';
    linkInput.value = '';
}

cardPopupToggle = function () {
    addCardPopup.classList.toggle('popup_opened');
};

addButton.addEventListener('click', cardPopupToggle);
cardPopupCloseButton.addEventListener('click', cardPopupToggle);

// Массив
const items = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Челябинская область'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Байкал'
    }
];

// Добавление карточек
const container = document.querySelector('.elements');
const template = document.querySelector('.template');

const render = () => {
    items.forEach((item) => {
        const currentItem = createItemNode(item.name, item.link, item.alt);
        container.append(currentItem);
    });

    cardPopupSaveButton.addEventListener('click', handleAddItem);
};

const createItemNode = (name, link, alt) => {
    const currentItem = template.content.cloneNode(true);
    const currantName = currentItem.querySelector('.element__title');
    const currantAlt = currentItem.querySelector('.element__image');
    const image = currentItem.querySelector('.element__image');
    currantName.textContent = name;
    image.src = link;
    currantAlt.alt = name;

    // Для удаления
    const deleteButton = currentItem.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', handleDeleteItem);

    // Для лайка
    const likeButton = currentItem.querySelector('.element__like');
    likeButton.addEventListener('click', handleLikeItem);

    // img - popup
    const imageLink = currentItem.querySelector('.element__image');
    imageLink.addEventListener('click', openImagePopup);

    return currentItem;
};

// Удаление карточки 
const handleDeleteItem = (evt) => {
    const currentEl = evt.target.closest('.element');
    currentEl.remove();
};

// Лайк
const handleLikeItem = (evt) => {
    const currentElement = evt.target.closest('.element__like');
    currentElement.classList.toggle('element__like_active');
};

// image popup
const imagePopup = document.querySelector('.image-popup');
const closeIconImagePopup = imagePopup.querySelector('.image-popup__close-button');
const imagePopupName = document.querySelector('.image-popup__name');
const imagePopupImage = document.querySelector('.image-popup__image');


const openImagePopup = (evt) => {
    const elementImage = evt.target.closest('.element__image');
    const elementName = evt.target.closest('.element__description');
    imagePopupImage.src = elementImage.src;
    imagePopupName.textContent = elementImage.alt;

    toggleImagePopup();
}


const toggleImagePopup = () => {
    imagePopup.classList.toggle('image-popup_opened');
};
closeIconImagePopup.addEventListener('click', toggleImagePopup);

render(); // рендер карточек

// Попап
popupToggle = function () {
    popup.classList.toggle('popup_opened');
};


popupOpen = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupToggle();
};

// Редактирование профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupToggle();
};

// Слушатели
popupEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);