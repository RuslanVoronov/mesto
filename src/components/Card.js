export default class Card {
    constructor(openImagePopup, handleDeleteIconClick, { handleAddLike }, { handleRemoveLike }, userId, data, templateCard) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateCard;
        this._openImagePopup = openImagePopup;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._questionPopupBtn = document.querySelector('#question-btn');
        this._data = data;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._handleDeleteIconClick = handleDeleteIconClick
        this._likes = this._data.likes;
        console.log(this._likes.some(x => x._id === this._userId))
    }

    _getElement() {
        const elementCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        return elementCard;
    }

    _addLike = () => {
        this._handleAddLike(this._data._id)
        this._buttonLike.classList.add('like__button_active');
        this._likes.push({ _id: this._userId })
        this._counter.textContent = parseInt(this._counter.textContent) + 1
    }

    _deleteLike = () => {
        this._handleRemoveLike(this._data._id)
        this._buttonLike.classList.remove('like__button_active');
        this._likes = this._likes.filter(x => x._id != this._userId);
        this._counter.textContent = parseInt(this._counter.textContent) - 1
    }

    deleteCard = () => {
        this._element.remove(this._data._id);
        this._element = null;
    }

    _checkLike = () => {
        console.log(this._likes.some(x => x._id === this._userId))
        return this._likes.some(x => x._id === this._userId)
    }

    _toggleLikeButton = () => {
        if (this._checkLike()) {
            this._deleteLike()
        } else {
            this._addLike()
        }

    }

    _setEventListeners = () => {

        // console.log(this._currentUserId === this._myId)
        this._buttonLike.addEventListener('click', (event) => this._toggleLikeButton(event))
        if (this._ownerId === this._userId) {

            this._buttonDelete.addEventListener('click', () => this._handleDeleteIconClick(this._data._id, this));


        } else {
            this._buttonDelete.style.visibility = 'hidden';
            // console.log('Не мой ID')
        }

        if (this._checkLike()) {

            this._buttonLike.classList.toggle('like__button_active');

        }


        this._cardImage.addEventListener('click', () => this._openImagePopup(this._name, this._link));
    }

    render = () => {
        this._element = this._getElement();
        this._buttonLike = this._element.querySelector('.like__button');

        this._buttonDelete = this._element.querySelector('.element__trash-button');

        this._cardImage = this._element.querySelector('.element__image');
        this._counter = this._element.querySelector('.like__counter')
        this._element.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._counter.textContent = this._data.likes.length;

        this._setEventListeners();
        return this._element;
    }
}
