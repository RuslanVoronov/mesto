export default class FormValidator {
    constructor(data, formElement) {
        this._form = data.form;
        this._input = data.input;
        this._submitButton = data.submitButton;
        this._inActiveButton = data.inActiveButton;
        this._inputError = data.inputError;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        this._setEventListeners();
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });

    };

    _setEventListeners = () => {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
        this._buttonElement = this._formElement.querySelector(this._submitButton);
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleInputErrorState(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _toggleInputErrorState(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };
    // Показать поле ошибки
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(this._errorClass);
    };
    // Скрыть поле ошибки
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    //  Проверка инпута на валидность
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    // Переключатель кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inActiveButton);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inActiveButton);
            this._buttonElement.disabled = false;
        }

    }
};