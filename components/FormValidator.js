export class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.form = formElement;
    }

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = formElement.querySelector(errorElementId);
        inputElement.classList.add(this.settings.inputErrorClass);
        errorElement.classList.add(this.settings.errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (formElement, inputElement) => {
        const errorElementId = `#${inputElement.id}-error`;
        const errorElement = formElement.querySelector(errorElementId);
        inputElement.classList.remove(this.settings.inputErrorClass);
        errorElement.classList.remove(this.settings.errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
    
    _setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(this.settings.inputSelector),);
        const buttonElement = formElement.querySelector(this.settings.submitButtonSelector);
        
        this.toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(formElement, inputElement);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    };

    toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.settings.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this.settings.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    enableValidation = () => {
        this.form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners(this.form);
    };

    resetValidation = () => {
        const inputList = Array.from(this.form.querySelectorAll(this.settings.inputSelector),);
        const buttonElement = this.form.querySelector(this.settings.submitButtonSelector);
        inputList.forEach(input => {
            input.value = "";
        });

        buttonElement.classList.add(this.settings.inactiveButtonClass);
        buttonElement.disabled = true;
    }
}