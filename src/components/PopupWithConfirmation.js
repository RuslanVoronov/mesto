import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, { callbackSubmit }) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector)
        this._submitButton = this._popup.querySelector('#question-btn')
        this._callbackSubmit = callbackSubmit;
    }

    open(cardId, cardElement) {
        super.open();
        this._cardId = cardId
        this._cardElement = cardElement
    }
    setEventListeners = () => {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
            this._callbackSubmit(this._cardId, this._cardElement);
        })
    }
    submitStatus = (text) => {
        this._submitButton.textContent = text;
    }
}