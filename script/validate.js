const setting = {
    form: '.popup__form',
    input: '.popup__input',
    submitButton: '.popup__save-button',
    activeButton: 'popup__save-button_valid',
    inputError: '.popup__error',
    errorClass: 'popup__error_visible'
}

function enableValidation(setting) {
    const formList = Array.from(document.querySelectorAll(setting.form));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();

        });
        setEventListeners(formElement, setting);
    });
};

const setEventListeners = (formElement, setting) => {
    const inputList = Array.from(formElement.querySelectorAll(setting.input));
    const buttonElement = formElement.querySelector(setting.submitButton);
    toggleButtonState(inputList, buttonElement, setting.submitButton);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleInputErrorState(formElement, inputElement, setting.inputError, setting.errorClass);
            toggleButtonState(inputList, buttonElement, setting.submitButton);
        });
    });
}

function toggleInputErrorState(formElement, inputElement, setting) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, setting);
    } else {
        hideInputError(formElement, inputElement, setting);
    }
};
// Показать поле ошибки
function showInputError(formElement, inputElement, errorMessage, setting) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(setting.inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(setting.errorClass);
};
// Скрыть поле ошибки
function hideInputError(formElement, inputElement, setting) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(setting.inputError);
    errorElement.classList.remove(setting.errorClass);
    errorElement.textContent = '';
};
//  Проверка инпута на валидность
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}
// Переключатель кнопки
function toggleButtonState(inputList, buttonElement, setting) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.remove('popup__save-button_valid');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.add('popup__save-button_valid');
        buttonElement.disabled = false;
    }
}

enableValidation(setting);