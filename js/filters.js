import { createFullGallery } from './photos.js';
import { debounce } from './utils/debounce.js';
const picturesContainer = document.querySelector('.pictures');
const pictureFilters = document.querySelector('.img-filters');
const buttonDefault = pictureFilters.querySelector('#filter-default');
const buttonMostComments = pictureFilters.querySelector('#filter-discussed');
const buttonRandom = pictureFilters.querySelector('#filter-random');
const FILTER_SHOWED_PICTURES = 10;
//Миксует массив фото
function getMix (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
//Блокирует кнопку
function disableButton(button) {
  button.setAttribute('disabled', 'disabled');
  if(!button.classList.contains('img-filters__button--active')) {
    button.classList.add('img-filters__button--active');
  }
}
//Разблокирует кнопку
function unlockButton(button) {
  if(button.hasAttribute('disabled')) {
    button.removeAttribute('disabled');
    if(button.classList.contains('img-filters__button--active')) {
      button.classList.remove('img-filters__button--active');
    }
  }
}
//Очистка списка картинок
function clearListPictures () {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach(() => {
    picturesContainer.removeChild(picturesContainer.lastChild);
  });
}
//Фильтр "По умолчанию"
function filterImageDefault (picture) {
  disableButton(buttonDefault);
  unlockButton(buttonRandom);
  unlockButton(buttonMostComments);
  clearListPictures();
  createFullGallery(picture);
}
//Фильтр 10 случайных фото
function filterImageRandom (picture) {
  disableButton(buttonRandom);
  unlockButton(buttonDefault);
  unlockButton(buttonMostComments);
  clearListPictures();
  const resultArray = getMix(picture.slice()).slice(0, FILTER_SHOWED_PICTURES);
  createFullGallery(resultArray);
}
//Фильтр "Обсуждаемые"
function filterImageDiscussed (picture) {
  disableButton(buttonMostComments);
  unlockButton(buttonDefault);
  unlockButton(buttonRandom);
  clearListPictures();
  const resultArray = picture
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);
  createFullGallery(resultArray);
}
//Обработчик клика на фильтр
function filtersClickChecker (evt, data) {
  const filterId = evt.target.getAttribute('id');
  switch(filterId) {
    case 'filter-default':
      filterImageDefault(data);
      break;
    case 'filter-random':
      filterImageRandom(data);
      break;
    case 'filter-discussed':
      filterImageDiscussed(data);
      break;
    default:
      throw new Error(`Unknown filter id ${filterId}`);
  }
}
//Включает фильтры при загрузке, а также debounce
function turnOnFilters (data) {
  pictureFilters.classList.remove('img-filters--inactive');
  disableButton(buttonDefault);
  unlockButton(buttonRandom);
  unlockButton(buttonMostComments);
  pictureFilters.addEventListener('click', debounce((evt) => filtersClickChecker(evt, data)));
}
export { turnOnFilters };

