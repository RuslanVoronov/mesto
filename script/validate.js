const validateInput = (inputElement) => {
    const errorElement = cardForm.querySelector(`#${inputElement.id}-error`);
    if (inputElement.checkValidity()) {
        errorElement.textContent = "";
    } else {
        errorElement.textContent = inputElement.validationMessage;
    }
}

const validateForm = (form) => {
    // form.preventDefault();
    validateInput(placeInput);
    validateInput(linkInput);

    if (cardForm.checkValidity()) {
        console.log('valid');
    } else {
        console.log('NOT valid');
    }
};

const validateFormOnPress = (evt) => {
    validateInput(evt.target);
};

cardForm.addEventListener('submit', validateForm);
cardForm.addEventListener('input', validateFormOnPress);