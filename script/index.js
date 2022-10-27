// Объявление Попапов
const imagePopup = document.querySelector('#image-popup');
const cardPopup = document.querySelector('#card-popup');
const profilePopup = document.querySelector('#profile-popup');

// Кнопки
const buttonCloseList = document.querySelectorAll('.popup__close-button');
const buttonSubmitList = document.querySelectorAll('.popup__save-button');

// Формы
const profileForm = document.querySelector('.popup__form_profile-form');
const cardForm = document.querySelector('.popup__form_card-form');

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
const profilePopupCloseButton = document.querySelector('.popup__close-button');

// Сard popup
const cardPopupCloseButton = document.querySelector('.popup__close-button_add-card');

// Image popup
const imagePopupCloseButton = imagePopup.querySelector('.image-popup__close-button');
const imagePopupName = document.querySelector('.image-popup__name');
const imagePopupImage = document.querySelector('.image-popup__image');


const render = () => {
    items.forEach((item) => {
        const currentItems = createItemNode(item.name, item.link, item.alt);
        container.append(currentItems);
    });
};

const createItemNode = (name, link) => {
    const currentItems = template.content.cloneNode(true);
    const currantName = currentItems.querySelector('.element__title');
    const image = currentItems.querySelector('.element__image');
    currantName.textContent = name;
    image.src = link;
    image.alt = name;

    // Для удаления
    const deleteButton = currentItems.querySelector('.element__trash-button');
    deleteButton.addEventListener('click', handleDeleteItem);

    // Для лайка
    const likeButton = currentItems.querySelector('.element__like');
    likeButton.addEventListener('click', handleLikeItem);

    // img - popup
    image.addEventListener('click', () => openImagePopup(name, link));

    return currentItems;
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
const openImagePopup = (name, link) => {
    imagePopupImage.src = link;
    imagePopupName.textContent = name;
    imagePopupImage.alt = name;
    openPopup(imagePopup);
};

// Открытие Профиль Попапа
openProfilePopup = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(profilePopup);
};

// Открытие Кард попап
openCardPopup = function () {
    openPopup(cardPopup);
};

// сохранение Card Popup
function handleAddItem(evt) {
    evt.preventDefault();
    const item = createItemNode(placeInput.value, linkInput.value);
    container.prepend(item);
    profileForm.reset();
    // closePopup(cardPopup);
};

// сохранение Profile Popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(profilePopup);
};

render(); // рендер карточек

// Закрытие на крестик
buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closePopup(popup));
});

// Переключатели попапа
openPopup = function (popup) {
    popup.classList.add('popup_opened');
};

closePopup = function (popup) {
    popup.classList.remove('popup_opened');
};

// Слушатели
popupEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openCardPopup);

profileForm.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', handleAddItem);


// закрытие на оверлэй
imagePopup.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget) {
        closePopup(imagePopup);
    };
});

cardPopup.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget) {
        closePopup(cardPopup);
    };
});

profilePopup.addEventListener('click', (evt) => {
    if (evt.target == evt.currentTarget) {
        closePopup(profilePopup);
    };
});

// Закрытие на Escape
document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        closePopup(imagePopup);
        closePopup(cardPopup);
        closePopup(profilePopup);
    };
});