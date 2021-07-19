import { createFullGallery} from './photos.js';
import './validation.js';
import './form.js';
import './filters.js';
import {setUserFormSubmit, showErrorPopup, showSuccessPopup, showErrorPopupServer} from './form.js';
import {turnOnFilters} from './filters.js';
//Загрузка данных с сервера
fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((picture) => {
    createFullGallery(picture);
    turnOnFilters(picture);
  }).catch(() => {
    showErrorPopupServer();
  });
setUserFormSubmit(showSuccessPopup, showErrorPopup);
