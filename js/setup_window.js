'use strict';

(function () {
  var setupWindow = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupWindow.querySelector('.setup-close');
  var setupSubmit = setupWindow.querySelector('.setup-submit');
  var setupUserName = setupWindow.querySelector('.setup-user-name');

  var userNameValid = window.validation(setupUserName);

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
    if (userNameValid) {
      closeSetupWindow();
    }
  });
  setupSubmit.addEventListener('keydown', function (event) {
    if (userNameValid) {
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
})();
