// Объявление Попапов
const imagePopup = document.querySelector('#image-popup');
const cardPopup = document.querySelector('#card-popup');
const profilePopup = document.querySelector('#profile-popup');

// Формы
const profileForm = document.querySelector('.profile-popup__form');
const cardForm = document.querySelector('.card-popup__form');

// Общие части попапа
const saveButton = document.querySelector('.popup__save-button');
const profilePopupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

// Добавление карточек
const container = document.querySelector('.elements');
const template = document.querySelector('.template');

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

// Сard popup
const cardPopupCloseButton = document.querySelector('.popup__close-button_add-card');
const cardPopupSaveButton = document.querySelector('.popup__save-button_add-card');

// Image popup
const imagePopupCloseButton = imagePopup.querySelector('.image-popup__close-button');
const imagePopupName = document.querySelector('.image-popup__name');
const imagePopupImage = document.querySelector('.image-popup__image');


const render = () => {
    items.forEach((item) => {
        const currentItem = createItemNode(item.name, item.link, item.alt);
        container.append(currentItem);
    });
};

const createItemNode = (name, link, alt) => {
    const currentItem = template.content.cloneNode(true);
    const currantName = currentItem.querySelector('.element__title');
    const image = currentItem.querySelector('.element__image');
    currantName.textContent = name;
    image.src = link;
    image.alt = name;

    // Для удаления
    const deleteButton = currentItem.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', handleDeleteItem);

    // Для лайка
    const likeButton = currentItem.querySelector('.element__like');
    likeButton.addEventListener('click', handleLikeItem);

    // img - popup
    image.addEventListener('click', openImagePopup);
    // image.addEventListener('click', () => openImagePopup(name, link));

    return currentItem;
};

// Удаление карточки 
const handleDeleteItem = (evt) => {
    const currentElement = evt.target.closest('.element');
    currentElement.remove();
};

// Лайк
const handleLikeItem = (evt) => {
    evt.target.classList.toggle('element__like_active');
};

// Открытие Image Popup
const openImagePopup = (evt) => {
    popup = document.querySelector('#image-popup');
    const elementImage = evt.target.closest('.element__image');
    imagePopupImage.src = elementImage.src;
    imagePopupName.textContent = elementImage.alt;
    imagePopupImage.alt = imagePopupName.textContent;
    openPopup(popup);
}

// Открытие Профиль Попапа
openProfilePopup = function () {
    popup = document.querySelector('#profile-popup');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popup);
};

// Открытие Кард попап
openCardPopup = function () {
    popup = document.querySelector('#card-popup')
    openPopup(popup);
};

// сохранение Card Popup
function handleAddItem(evt) {
    popup = document.querySelector('#card-popup');
    evt.preventDefault();
    const item = createItemNode(placeInput.value, linkInput.value);
    container.prepend(item);
    profileForm.reset();
    closePopup(popup);
};

// сохранение Profile Popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popup);
};

// Иконки закрытия
imagePopupCloseButton.addEventListener('click', () => {
    closePopup(popup);
});
cardPopupCloseButton.addEventListener('click', () => {
    closePopup(popup);
});
profilePopupCloseButton.addEventListener('click', () => {
    closePopup(popup);
});

render(); // рендер карточек

// Переключатели попапа
openPopup = function (popup) {
    popup.classList.add('popup_opened');
};
closePopup = function (popup) {
    popup.classList.remove('popup_opened');
};

popupEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openCardPopup);

profileForm.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', handleAddItem);