'use strict';

var ESC_KEY = 27;
var ENTER_KEY = 13;

var WIZARD_NAME = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_SURNAME = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

var wizards = [];

var setupWindow = document.querySelector('.setup');
var similarWindow = document.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var setupSimilarList = document.querySelector('.setup-similar-list');

var generateRandomIndex = function (max, min) {
  return Math.floor((max - min + 1) * Math.random()) + min;
};

// --- Создание массива волшебников ---
for (var i = 0; i < 4; i++) {
  var wizardObject = {
    name: WIZARD_NAME[generateRandomIndex(0, WIZARD_NAME.length - 1)] + '' + WIZARD_SURNAME[generateRandomIndex(0, WIZARD_SURNAME.length - 1)],
    coatColor: WIZARD_COAT_COLOR[generateRandomIndex(0, WIZARD_COAT_COLOR.length - 1)],
    eyesColor: WIZARD_EYES_COLOR[generateRandomIndex(0, WIZARD_EYES_COLOR.length - 1)]
  };
  wizards.push(wizardObject);
}

// --- Клонирование шаблона волшебника и заполнение данными из массива ---
var renderOneWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// --- Вставка данных в фрагмент ---
var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderOneWizard(wizards[j]));
}

// --- Заполнение данными из фрагмента в скрытое окно настроек со списком волшебников ---
var renderWizardList = function () {
  setupSimilarList.appendChild(fragment);
  similarWindow.classList.remove('hidden');
};

renderWizardList();

// --- Открытие/закрытие окошки настройки ---
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupSubmit = document.querySelector('.setup-submit');
var setupUserName = document.querySelector('.setup-user-name');

var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', setupEscCloser);
};

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.addEventListener('keydown', setupEscCloser);
};

var setupEscCloser = function (event) {
  if (event.keyCode === ESC_KEY && setupUserName.validity.valid) {
    closeSetupWindow();
  }
};

setupOpen.addEventListener('click', function () {
  openSetupWindow();
});
setupOpen.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEY) {
    openSetupWindow();
  }
});

// --- Проверка валидаций при нажатий кнопки сохранить ---
setupSubmit.addEventListener('click', function () {
  if (setupUserName.validity.valid) {
    closeSetupWindow();
  }
});
setupSubmit.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEY && setupUserName.validity.valid) {
    closeSetupWindow();
  }
});

setupUserName.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEY) {
    event.stopPropagation();
  }
}, true);

setupUserName.addEventListener('invalid', function () {
  if (!setupUserName.validity.valid) {
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

setupClose.addEventListener('click', function () {
  closeSetupWindow();
});
setupClose.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEY) {
    closeSetupWindow();
  }
});

// --- Изменения цвета глаз, мантий и файрбола ---
var wizardSetup = setupWindow.querySelector('.setup-wizard');
var wizardCoatSetup = wizardSetup.querySelector('.wizard-coat');
var wizardEyesSetup = wizardSetup.querySelector('.wizard-eyes');
var fireballSetup = setupWindow.querySelector('.setup-fireball-wrap');

var colorChanger = function (event) {
  var currentStyle = event.currentTarget.style;

  if (event.currentTarget === wizardCoatSetup) {
    currentStyle.fill = WIZARD_COAT_COLOR[generateRandomIndex(0, WIZARD_COAT_COLOR.length - 1)];
  } else if (event.currentTarget === wizardEyesSetup) {
    currentStyle.fill = WIZARD_EYES_COLOR[generateRandomIndex(0, WIZARD_EYES_COLOR.length - 1)];
  } else if (event.currentTarget === fireballSetup) {
    currentStyle.backgroundColor = FIREBALL_COLOR[generateRandomIndex(0, FIREBALL_COLOR.length - 1)];
  }
};

wizardCoatSetup.addEventListener('click', colorChanger);
wizardEyesSetup.addEventListener('click', colorChanger);
fireballSetup.addEventListener('click', colorChanger);
