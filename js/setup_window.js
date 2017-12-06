'use strict';

(function () {
  var setupWindow = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupSubmit = setupWindow.querySelector('.setup-submit');
  var setupUserName = setupWindow.querySelector('.setup-user-name');

  // --- Открытие/закрытие окошки настройки ---
  var openSetupWindow = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', setupEscCloser);
  };
  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');
    document.addEventListener('keydown', setupEscCloser);
  };
  var setupEscCloser = function (event) {
    window.generic.escEvent(event, closeSetupWindow);
  };
  setupOpen.addEventListener('click', function () {
    openSetupWindow();
  });
  setupOpen.addEventListener('keydown', function (event) {
    window.generic.escEvent(event, openSetupWindow);
  });

  // --- Проверка валидаций при нажатий кнопки сохранить ---
  setupSubmit.addEventListener('click', function () {
    if (window.validation.isValid(setupUserName)) {
      closeSetupWindow();
    }
  });
  setupSubmit.addEventListener('keydown', function (event) {
    if (window.validation.isValid(setupUserName)) {
      window.generic.enterEvent(event, closeSetupWindow);
    }
  });

  setupUserName.addEventListener('keydown', function (event) {
    event.stopPropagation();
  }, true);

  setupClose.addEventListener('click', function () {
    closeSetupWindow();
  });
  setupClose.addEventListener('keydown', function (event) {
    window.generic.enterEvent(event, closeSetupWindow);
  });

  setupUserName.addEventListener('invalid', function () {
    if (window.validation.isValid(setupUserName, function (customValidityText) {
      setupUserName.setCustomValidity(customValidityText);
    })) {
      setupUserName.setCustomValiditiy('');
    }
  });

  setupUserName.addEventListener('input', function (event) {
    var target = event.target;

    if (window.validation.isValid(target, function (customValidityText) {
      target.setCustomValidity(customValidityText);
    })) {
      target.setCustomValidity('');
    }
  });
})();
