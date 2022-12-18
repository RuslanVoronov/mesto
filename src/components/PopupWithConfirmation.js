import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, { callbackSubmit }) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector)
        this._submitButton = this._popup.querySelector('#question-btn')
        this._callbackSubmit = callbackSubmit;
    }
    setEventListeners = (cardId, cardElement) => {
        super.setEventListeners();
        this._submitButton.addEventListener('click', () => {
            this._callbackSubmit(cardId, cardElement);
        })
    }
    submitStatus = (text) => {
        this._submitButton.textContent = text;
    }
}