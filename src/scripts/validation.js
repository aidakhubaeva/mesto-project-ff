export function isValid(input, settings, form) {
    const errorElement = form.querySelector(`#${input.name}-error`);
    input.setCustomValidity("");
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage || "Некорректный ввод.");
    } else if (input.validity.typeMismatch) {
      input.setCustomValidity("Введите адрес сайта.");
    } else if (input.validity.valueMissing) {
      input.setCustomValidity("Вы пропустили это поле.");
    } else {
      input.setCustomValidity("");
    }
    if (!input.validity.valid) {
      showInputError(input, errorElement, input.validationMessage, settings);
    } else {
      hideInputError(input, errorElement, settings);
    } 
}
  
  function showInputError(input, errorElement, errorMessage, settings) {
    input.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  }
  
  function hideInputError(input, errorElement, settings) {
    input.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  }
  

  export function disableButton(button, settings) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  }
  
  export function enableButton(button, settings) {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
  
  export function clearValidation(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);
    inputs.forEach((input) => {
      hideInputError(input, form.querySelector(`#${input.name}-error`), settings);
    });
    
    disableButton(button, settings);
  }

  function setEventListeners(form, settings) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    const button = form.querySelector(settings.submitButtonSelector);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        isValid(input, settings, form);
        const hasInvalidInput = inputs.some((input) => !input.validity.valid);
        if (hasInvalidInput) {
          disableButton(button, settings);
        } else {
          enableButton(button, settings);
        }
      });
    });

    const hasInvalidInput = inputs.some((input) => !input.validity.valid);
    if (hasInvalidInput) {
      disableButton(button, settings);
    } else {
      enableButton(button, settings);
    }
  }
  
  export function enableValidation(settings) {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));
    forms.forEach((form) => {
      setEventListeners(form, settings);
    });
  }