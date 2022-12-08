import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { callbackFormSubmit }) {
        super(popupSelector);
        this._callbackFormSubmit = callbackFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._formValues = {};
    }

    _getInputValues = () => {
        this._inputList.forEach(inputItem => {
            this._formValues[inputItem.name] = inputItem.value;
        });
        return this._formValues;
    };

    close = () => {
        super.close();
        this._popupForm.reset();
    };

    setEventListeners = () => {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackFormSubmit(this._getInputValues());
        });
    }

}