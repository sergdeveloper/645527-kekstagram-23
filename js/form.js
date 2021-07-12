import { isEscapeEvent, isEnterEvent } from './utils.js';
import {  checkInputIsActive, hashtagInputChecker, commentInputChecker, inputHashtag, inputComment } from './validation.js';
const body = document.querySelector('body');
const formDownloadPicture = document.querySelector('#upload-select-image');
const inputFile = formDownloadPicture.querySelector('#upload-file');
const overlayEditor = formDownloadPicture.querySelector('.img-upload__overlay');
const buttonClose = overlayEditor.querySelector('#upload-cancel');
//Функция закрытия попапа (Обнуляет содержимое полей)
function closePopup () {
  overlayEditor.classList.add('hidden');
  body.classList.remove('modal-open');
  inputFile.value = '';
  inputComment.value = '';
  inputHashtag.value = '';
  inputHashtag.removeEventListener('input', hashtagInputChecker);
  inputComment.removeEventListener('input', commentInputChecker);
  document.removeEventListener('keydown', documentdownChecker);
  buttonClose.removeEventListener('keydown', buttonCloseChecker);
}
//Обработчик нажатий на ENTER
function buttonCloseChecker(evt) {
  if(isEnterEvent(evt)) {
    closePopup();
  }
}
//Функция открытия попапа
function openPopup () {
  overlayEditor.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', documentdownChecker);
  buttonClose.addEventListener('keydown', buttonCloseChecker);
  inputHashtag.addEventListener('input', hashtagInputChecker);
  inputComment.addEventListener('input', commentInputChecker);
}
buttonClose.addEventListener('click', buttonCloseClickChecker);
//Обработчик нажатий на ESCAPE
function documentdownChecker (evt) {
  if(isEscapeEvent(evt) && !checkInputIsActive()) {
    evt.preventDefault();
    closePopup();
  }
}
//Обработчик изменения загружаемого файла
function inputFileChangeChecker () {
  openPopup();
}
//Обработчик клика на "Закрыть"
function buttonCloseClickChecker () {
  closePopup();
}
inputFile.addEventListener('change', inputFileChangeChecker);

