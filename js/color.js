'use strict';

(function () {
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

  var generateRandomColor = function (arr) {
    return arr[window.generic.generateRandomIndex(0, arr.length)];
  };

  window.color = function (elem, changeColor) {
    elem.addEventListener('click', function () {
      var arr;
      switch (elem) {
        case 'wizardCoat': arr = WIZARD_COAT_COLOR;
          break;
        case 'wizardEyes': arr = WIZARD_EYES_COLOR;
          break;
        case 'fireball': arr = FIREBALL_COLOR;
          break;
      }

      var color = generateRandomColor(arr);
      changeColor(color);
    });
  };
})();
