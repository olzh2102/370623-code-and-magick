'use strict';

(function () {
  var setupWindow = document.querySelector('.setup');
  var setupUserName = setupWindow.querySelector('.setup-user-name');
  var userNameValid = window.validation.isValid(setupUserName);

  setupUserName.addEventListener('invalid', function () {
    if (!userNameValid) {
      if (setupUserName.validity.tooShort) {
        setupUserName.setCustomValidity('имя персонажа не может содержать менее 2 символов');
      }
      if (setupUserName.validity.tooLong) {
        setupUserName.setCustomValidity('максимальная длина имени персонажа — 25 символов');
      }
      if (setupUserName.validity.valueMissing) {
        setupUserName.setCustomValidity('это поле должно быть заполненным');
      }
    } else {
      setupUserName.setCustomValiditiy('');
    }
  });

  setupUserName.addEventListener('input', function (event) {
    var target = event.target;

    if (target.value.length < 2) {
      target.setCustomValidity('имя персонажа не может содержать менее 2 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  window.validation = {
    isValid: function (elem) {
      return elem.validity.valid;
    }
  };
})();
