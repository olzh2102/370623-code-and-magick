'use strict';

(function () {
  window.validation = {
    isValid: function (elem) {
      return elem.validity.valid;
    }
  };
})();
