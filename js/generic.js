'use strict';

(function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 13;

  window.generic = {
    escEvent: function (event, action) {
      if (event.keyCode === ESC_KEY) {
        action();
      }
    },
    enterEvent: function (event, action) {
      if (event.keyCode === ENTER_KEY) {
        action();
      }
    },
    generateRandomIndex: function (max, min) {
      return Math.floor((max - min + 1) * Math.random()) + min;
    }
  };
})();
