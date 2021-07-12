//случайное число из диапазона
const getRandom = function (minimal, maximal) {
  if (minimal > 0 && maximal > 0 && minimal < maximal) {
    return Math.floor(Math.random() * (maximal - minimal + 1)) + minimal;
  }
  else {
    return 'Минимальное число не может быть отрицательным и больше макисмального';
  }
};
//проверка длины комментария
const getLength = function (field, amount) {
  if (amount <= 0) {
    return null;
  }
  return field.length <= amount;
};
//Создание нового элемента
const createNewElement = (tagName, className) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
};
//Проверка нажатия на Эскейп
function isEscapeEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

export {getRandom, getLength, createNewElement, isEscapeEvent};
