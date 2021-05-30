//случайное число из диапазона

const getRandom = function (from, to) {
    if (from > 0 && to > 0 && from < to) {
      return Math.floor(Math.random() * (to - from + 1)) + from;
    }
    else {
      return 'Минимальное число не может быть отрицательным и больше макисмального';
    }
  };
  
  getRandom (100, 90);
  
  //проверка длины комментария
  
  const getLength = function (field, amount) {
    if (field.length <= amount) {
      return 'Комментарий отправлен';
    }
    else {
      return 'Превышен лимит символов';
    }
  };
  
  getLength(100, 140);