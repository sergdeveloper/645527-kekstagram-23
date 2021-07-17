import { isEscapeEvent, isEnterEvent } from './utils.js';
import {  checkInputIsActive, hashtagInputChecker, commentInputChecker, inputHashtag, inputComment } from './validation.js';
import { setDefaultSetting, removeEffectsCheckers } from './effects.js';
const body = document.querySelector('body');
const formDownloadPicture = document.querySelector('#upload-select-image');
const sendForm = document.querySelector('.img-upload__form');
const inputFile = formDownloadPicture.querySelector('#upload-file');
const overlayEditor = formDownloadPicture.querySelector('.img-upload__overlay');
const buttonClose = overlayEditor.querySelector('#upload-cancel');
const successTemplate = document.querySelector('#success').content;
const successTemplateMessage = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorTemplateMessage = errorTemplate.querySelector('.error');
const errorTemplateMessageServer = document.querySelector('#error--server').content;
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
  removeEffectsCheckers();
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
  setDefaultSetting();
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
//Создание сообщения из шаблона
function createMessage (messageTemplate) {
  const element = messageTemplate.cloneNode(true);
  return element;
}
//Закрытие сообщения
function closeMessage () {
  const message = body.lastChild;
  message.style.display = 'none';
  body.removeChild(message);
}
//Обработчик нажатия на закрыть сообзение
function buttonCloseMessageClickChecker () {
  closeMessage();
}
//Обработчик нажатия на эскейп
function documentKeydownChecker (evt) {
  if(isEscapeEvent(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}
//Проверка на то является ли элемент поаппом
function checkIsItPopup (element) {
  const messagesClasses = ['error', 'success'];
  for (let i = 0; i < messagesClasses.length; i++) {
    if(element.className === messagesClasses[i]) {
      return true;
    }
  }
  return false;
}
//Обработчик нажатия на оверлей
function overlayClickChecker(evt) {
  const element = body.lastChild;
  if(checkIsItPopup(element)) {
    if(checkIsItPopup(evt.target)) {
      closeMessage();
    }
  }
}
//Отображение сообщения
function showMessage(message, buttonClass) {
  body.appendChild(createMessage(message));
  const buttonCloseMessage = document.querySelector(buttonClass);
  buttonCloseMessage.addEventListener('click', buttonCloseMessageClickChecker);
  document.addEventListener('keydown', documentKeydownChecker);
  document.addEventListener('click', overlayClickChecker);
}
//Отображение сообщения с успешным исходом
function showSuccessPopup () {
  closePopup();
  showMessage(successTemplateMessage, '.success__button');
}
//Отображение сообщения с неуспешным исходом
function showErrorPopup () {
  closePopup();
  showMessage(errorTemplateMessage, '.error__button');
}
//Отображение сообщения с неуспешным исходом при загрузке
function showErrorPopupServer () {
  showMessage(errorTemplateMessageServer, '.error__button');
}
//Функция отправки формы, с разными исходами
const setUserFormSubmit = (onSuccess, onFail) => {
  sendForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    fetch(
      'https://23.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => {
        onFail();
      });
  });
};
export {setUserFormSubmit, closePopup, showSuccessPopup, showErrorPopup, showErrorPopupServer};
