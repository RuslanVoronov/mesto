import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelectorm, { callbackFormSubmit }) {
        super(popupSelectorm);
        this._callbackFormSubmit = callbackFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues = () => {
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        // Наполняем пустой массив данными через forEach
        this._formValues = {};
        this._inputList.forEach(inputItem => {
            this._formValues[inputItem.name] = inputItem.value;
        });
        return this._formValues;
    };

    close = () => {
        super.close();
    };

    setEventListeners = () => {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackFormSubmit(this._getInputValues());
        });
    }

}