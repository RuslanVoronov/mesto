const setting = {
    form: '.popup__form',
    input: '.popup__input',
    submitButton: '.popup__save-button',
    inActiveButton: 'popup__save-button_invalid',
    inputError: 'popup__error',
    errorClass: 'popup__input_error_visible'
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
    toggleButtonState(inputList, buttonElement, setting);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            toggleInputErrorState(formElement, inputElement, setting);
            toggleButtonState(inputList, buttonElement, setting);
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
    errorElement.textContent = errorMessage;
    inputElement.classList.add(setting.errorClass);
};
// Скрыть поле ошибки
function hideInputError(formElement, inputElement, setting) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(setting.errorClass);
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
        buttonElement.classList.add(setting.inActiveButton);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(setting.inActiveButton);
        buttonElement.disabled = false;
    }
}

enableValidation(setting);