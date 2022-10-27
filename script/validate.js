const submitButtonProfile = document.querySelector("#save-button-profile");
const submitButtonCard = document.querySelector("#save-button-card");

const validateCardInput = (inputElement) => {
    const errorElement = cardForm.querySelector(`#${inputElement.id}-error`);
    if (inputElement.checkValidity()) {
        errorElement.textContent = "";
    } else {
        errorElement.textContent = inputElement.validationMessage;
    }

    if (cardForm.checkValidity()) {
        setSubmitButtonState(true)
    } else {
        setSubmitButtonState(false)
    }
};

const validateProfileInput = (inputElement) => {
    const errorElement = profileForm.querySelector(`#${inputElement.id}-error`);
    if (inputElement.checkValidity()) {
        errorElement.textContent = "";
    } else {
        errorElement.textContent = inputElement.validationMessage;
    }

    if (profileForm.checkValidity()) {
        setSubmitButtonState(true)
    } else {
        setSubmitButtonState(false)
    }
};

const setSubmitButtonState = (isActive) => {
    if (isActive) {
        submitButtonCard.classList.add('popup__save-button_valid')
        submitButtonCard.classList.remove('popup__save-button_invalid')
        submitButtonCard.removeAttribute('disabled')

        submitButtonProfile.classList.add('popup__save-button_valid')
        submitButtonProfile.classList.remove('popup__save-button_invalid')
        submitButtonProfile.removeAttribute('disabled')
    } else {
        submitButtonCard.classList.add('popup__save-button_invalid')
        submitButtonCard.classList.remove('popup__save-button_valid')
        submitButtonCard.setAttribute('disabled', true)

        submitButtonProfile.classList.add('popup__save-button_invalid')
        submitButtonProfile.classList.remove('popup__save-button_valid')
        submitButtonProfile.setAttribute('disabled', true)
    }
};

const validateCardForm = (evt) => {
    evt.preventDefault();
    validateCardInput(placeInput);
    validateCardInput(linkInput);

    if (cardForm.checkValidity()) {
        console.log('valid');
    } else {
        console.log('NOT valid');
    }
};

const validateProfileForm = (evt) => {
    evt.preventDefault();
    validateProfileInput(nameInput);
    validateProfileInput(jobInput);

    if (profileForm.checkValidity()) {
        console.log('valid');
    } else {
        console.log('NOT valid');
    }
};

const validateCardFormOnPress = (evt) => {
    validateCardInput(evt.target);
};

const validateProfileFormOnPress = (evt) => {
    validateProfileInput(evt.target);
};





cardForm.addEventListener('submit', validateCardForm);
cardForm.addEventListener('input', validateCardFormOnPress);

profileForm.addEventListener('submit', validateProfileForm);
profileForm.addEventListener('input', validateProfileFormOnPress);