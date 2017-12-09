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
      name: WIZARD_NAME[window.generic.generateRandomIndex(0, WIZARD_NAME.length - 1)] + ' ' + WIZARD_SURNAME[window.generic.generateRandomIndex(0, WIZARD_SURNAME.length - 1)],
      coatColor: window.color(wizardCoatSetup, null),
      eyesColor: window.color(wizardEyesSetup, null)
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
  wizardCoatSetup.addEventListener('click', function () {
    window.color(wizardCoatSetup, function (color) {
      wizardCoatSetup.style.fill = color;
    });
  });
  wizardEyesSetup.addEventListener('click', function () {
    window.color(wizardEyesSetup, function (color) {
      wizardEyesSetup.style.fill = color;
    });
  });
  fireballSetup.addEventListener('click', function () {
    window.color(fireballSetup, function (color) {
      fireballSetup.style.background = color;
    });
  });

  // Find artifacts elements
  var shopElement = setupWindow.querySelector('.setup-artifacts-shop');
  var draggedItem = null;


  var showIfGotChild = function () {
    for (var index = 0; index < artifactsDropCells.length; index++) {
      var cell = artifactsDropCells[index];

      if (cell.children.length === 0) {
        cell.style.outline = '2px dashed red';
      } else {
        cell.style.outline = '';
      }
    }
  };

  var hideHighlight = function () {
    for (var index = 0; index < artifactsDropCells.length; index++) {
      artifactsDropCells[index].style.outline = '';
    }
  };

  shopElement.addEventListener('dragstart', function (event) {
    if (event.target.tagName.toLowerCase() === 'img') {
      showIfGotChild();
      draggedItem = event.target;
      event.dataTransfer.setData('text/plain', event.target.alt);
    }
  });

  // Find element where to drop item
  var artifactsElement = document.querySelector('.setup-artifacts');
  artifactsElement.addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
  });

  var artifactsDropCells = artifactsElement.querySelector('.setup-artifacts-cell');

  artifactsElement.addEventListener('drop', function (event) {
    event.target.style.background = '';
    hideHighlight();
    event.target.appendChild(draggedItem);
    event.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (event) {
    event.target.style.background = 'yellow';
    event.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (event) {
    event.target.style.background = '';
    event.preventDefault();
  });
})();
