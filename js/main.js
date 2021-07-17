import { createFullGallery} from './photos.js';
import './validation.js';
import './form.js';
import {setUserFormSubmit, showErrorPopup, showSuccessPopup, showErrorPopupServer} from './form.js';

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((picture) => {
    createFullGallery(picture);
  }).catch(() => {
    showErrorPopupServer();
  });

setUserFormSubmit(showSuccessPopup, showErrorPopup);
