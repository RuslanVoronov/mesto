export default class Card {
    constructor(openImagePopup, data, templateCard) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateCard;
        this._openImagePopup = openImagePopup;
    }

    _getElement() {
        const elementCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        return elementCard;
    }

    _addLike = () => {
        this._buttonLike.classList.toggle('element__like_active');
    }

    _deleteCard = () => {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners = () => {
        this._buttonLike.addEventListener('click', event => this._addLike(event));
        this._buttomDelete.addEventListener('click', event => this._deleteCard(event));
        this._cardImage.addEventListener('click', () => this._openImagePopup(this._name, this._link));
    }

    render = () => {
        this._element = this._getElement();
        this._buttonLike = this._element.querySelector('.element__like');
        this._buttomDelete = this._element.querySelector('.element__trash-button');
        this._cardImage = this._element.querySelector('.element__image');

        this._element.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();

        return this._element;
    }
}
