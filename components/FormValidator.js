export class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings;
        this.form = formElement;
        this.inputList = Array.from(this.form.querySelectorAll(this.settings.inputSelector));
        this.inputElement = this.form.querySelector(this.settings.inputSelector);
        this.buttonElement = this.form.querySelector(this.settings.submitButtonSelector);
        this.errorElementId = `#${this.inputElement.id}-error`;
        this.errorElement = this.form.querySelector(this.errorElementId);
        this.errorMessage = this.inputElement.validationMessage;
    }

    _showInputError = () => {
        this.inputElement.classList.add(this.settings.inputErrorClass);
        this.errorElement.classList.add(this.settings.errorClass);
        this.errorElement.textContent = this.errorMessage;
    };

    _hideInputError = () => {
        this.inputElement.classList.remove(this.settings.inputErrorClass);
        this.errorElement.classList.remove(this.settings.errorClass);
        this.errorElement.textContent = "";
    };

    _hasInvalidInput = () => {
        return !this.inputElement.validity.valid;
    };

    _checkInputValidity = () => {
        if (this._hasInvalidInput()) {
            this._showInputError();
        } else {
            this._hideInputError();
        }
    };

    _disableButton = () => {
        this.buttonElement.classList.add(this.settings.inactiveButtonClass);
        this.buttonElement.disabled = true;
    }

    _enableButton = () => {
        this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
        this.buttonElement.disabled = false;
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    };
    
    _setEventListeners = () => {
        this._toggleButtonState();
        this.inputElement.addEventListener("input", () => {
            this._checkInputValidity();
            this._toggleButtonState();
        });
    };

    enableValidation = () => {
        this.form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this.form);
    };

    resetValidation = () => {
        this.inputList.forEach(input => {
            input.value = "";
        });
        this._disableButton();
    }
}