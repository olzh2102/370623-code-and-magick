'use strict';

(function () {
  window.validation = {
    isValid: function (elem, changeCustomValidity) {
      if (elem.validity.tooShort || elem.value.length < 2) {
        changeCustomValidity('Имя должно состоять минимум из 2-х символов');
      }
      if (elem.validity.tooLong) {
        changeCustomValidity('Имя не должно превышать 25-ти символов');
      }
      if (elem.validity.valueMissing) {
        changeCustomValidity('Заполните поле');
      }
      return elem.validity.valid;
    }
  };
})();
