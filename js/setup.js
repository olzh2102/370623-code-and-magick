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
  if (event.keyCode === ESC_KEY) {
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

setupClose.addEventListener('click', function () {
  closeSetupWindow();
});
setupClose.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEY) {
    closeSetupWindow();
  }
});

setupUserName.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEY) {
    event.preventDefault();
    setupClose.focus();
  }
});

setupSubmit.addEventListener('click', function (event) {
  event.preventDefault();
  closeSetupWindow();
});
setupSubmit.addEventListener('keydown', function (event) {
  if (event.keyCode === ENTER_KEY) {
    event.preventDefault();
    closeSetupWindow();
  }
});
