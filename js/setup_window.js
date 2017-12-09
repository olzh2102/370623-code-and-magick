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
    setupWindow.style.top = '';
    setupWindow.style.left = '';
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

  var userAvatar = document.querySelector('input[name="avatar"]');
  var hideUserAvatar = function (event) {
    event.preventDefault();
    userAvatar.style.display = 'none';
  };

  userAvatar.addEventListener('mouseover', hideUserAvatar);
  var setupDialogHandle = document.querySelector('.setup-user-pic');
  setupDialogHandle.addEventListener('mousedown', function (downEvent) {
    downEvent.preventDefault();

    var startingCoords = {
      x: downEvent.clientX,
      y: downEvent.clientY
    };

    var mouseMover = function (moveEvt) {
      moveEvt.preventDefault();
      userAvatar.style.display = '';

      var shift = {
        x: startingCoords.x - moveEvt.clientX,
        y: startingCoords.y - moveEvt.clientY
      };

      startingCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupWindow.style.top = (setupWindow.offsetTop - shift.y) + 'px';
      setupWindow.style.left = (setupWindow.offsetLeft - shift.x) + 'px';
    };

    var mouseUper = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMover);
      document.removeEventListener('moveup', mouseUper);
    };

    document.addEventListener('mousemove', mouseMover);
    document.addEventListener('mouseup', mouseUper);
  });
})();
