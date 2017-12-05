'use strict';

(function () {
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

  var wizards = [];

  var setupWindow = document.querySelector('.setup');
  var similarWindow = document.querySelector('.setup-similar');
  var wizardSetup = setupWindow.querySelector('.setup-wizard');
  var wizardCoatSetup = wizardSetup.querySelector('.wizard-coat');
  var wizardEyesSetup = wizardSetup.querySelector('.wizard-eyes');
  var fireballSetup = setupWindow.querySelector('.setup-fireball-wrap');

  // --- Создание массива волшебников ---
  for (var i = 0; i < 4; i++) {
    var wizardObject = {
      name: WIZARD_NAME[window.generic.generateRandomIndex(0, WIZARD_NAME.length - 1)] + '' + WIZARD_SURNAME[window.generic.generateRandomIndex(0, WIZARD_SURNAME.length - 1)],
      coatColor: window.color(wizardCoatSetup, function (color) {
        wizardCoatSetup.style.fill = color;
      }),
      eyesColor: window.color(wizardEyesSetup, function (color) {
        wizardEyesSetup.style.fill = color;
      }),
    };
    wizards.push(wizardObject);
  }

  // --- Клонирование шаблона волшебника и заполнение данными из массива ---
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

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
  var setupSimilarList = document.querySelector('.setup-similar-list');

  var renderWizardList = function () {
    setupSimilarList.appendChild(fragment);
    similarWindow.classList.remove('hidden');
  };

  renderWizardList();

  // --- Меняем цвета волшебников ---
  window.color(wizardCoatSetup, function (color) {
    wizardCoatSetup.style.fill = color;
  });
  window.color(wizardEyesSetup, function (color) {
    wizardEyesSetup.style.fill = color;
  });
  window.color(fireballSetup, function (color) {
    fireballSetup.style.background = color;
  });
})();
