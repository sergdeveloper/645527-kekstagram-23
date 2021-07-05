//случайное число из диапазона

const getRandom = function (minimal, maximal) {
  if (minimal > 0 && maximal > 0 && minimal < maximal) {
    return Math.floor(Math.random() * (maximal - minimal + 1)) + minimal;
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

const createNewElement = (tagName, className) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
};

function isEscapeEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export {getRandom, getLength, createNewElement, isEscapeEvent};
