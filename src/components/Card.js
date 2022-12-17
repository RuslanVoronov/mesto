export default class Card {
    constructor(openImagePopup, handleDeleteIconClick, openQuestionPopup,  userId, data, templateCard) {
        this._name = data.name;
        this._link = data.link;
        this._template = templateCard;
        this._openImagePopup = openImagePopup;
        this._openQuestionPopup = openQuestionPopup;
        this._questionPopupBtn = document.querySelector('#question-btn');
        this._data = data;
        this._currentUserId = data.owner._id;
        this._myId = userId;
        this._handleDeleteIconClick = handleDeleteIconClick
    }

    _getElement() {
        const elementCard = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        return elementCard;
    }

    _addLike = () => {
        this._buttonLike.classList.toggle('like__button_active');
    }

    deleteCard = () => {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners = () => {
        this._buttonLike.addEventListener('click', event => this._addLike(event));
        console.log(this._currentUserId === this._myId)

        if (this._currentUserId === this._myId) {

            this._buttonDelete.addEventListener('click', () => this._handleDeleteIconClick(this._myId));
            // (event) => {

            //     this._questionPopupBtn.addEventListener('click', this._deleteCard(event));
            // });

        } else {
            this._buttonDelete.style.visibility = 'hidden';
            console.log('Не мой ID')
        }
        // this._questionPopupBtn.addEventListener('click', (event) => console.log(event));
        this._cardImage.addEventListener('click', () => this._openImagePopup(this._name, this._link));
    }

    isThisUserCard(userId) {
        return userId === this._data.owner._id;
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
