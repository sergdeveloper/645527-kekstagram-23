import { isEscapeEvent, isEnterEvent } from './utils.js';
import { checkInputIsActive, hashtagInputHandler, commentInputHandler, inputHashtag, inputComment } from './validation.js';
import { setDefaultSetting, removeEffectsHandlers } from './effects.js';
import { showLoadedImage } from './own-photo.js';
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
  inputHashtag.removeEventListener('input', hashtagInputHandler);
  inputComment.removeEventListener('input', commentInputHandler);
  document.removeEventListener('keydown', documentdownHandler);
  buttonClose.removeEventListener('keydown', buttonCloseHandlers);
  removeEffectsHandlers();
}
//Обработчик нажатий на ENTER
function buttonCloseHandlers(evt) {
  if(isEnterEvent(evt)) {
    closePopup();
  }
}
//Функция открытия попапа
function openPopup () {
  overlayEditor.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', documentdownHandler);
  buttonClose.addEventListener('keydown', buttonCloseHandlers);
  inputHashtag.addEventListener('input', hashtagInputHandler);
  inputComment.addEventListener('input', commentInputHandler);
  showLoadedImage();
  setDefaultSetting();
}
buttonClose.addEventListener('click', buttonCloseClickHandler);
//Обработчик нажатий на ESCAPE
function documentdownHandler (evt) {
  if(isEscapeEvent(evt) && !checkInputIsActive()) {
    evt.preventDefault();
    closePopup();
  }
}
//Обработчик изменения загружаемого файла
function inputFileChangeHandler () {
  openPopup();
}
//Обработчик клика на "Закрыть"
function buttonCloseClickHandler () {
  closePopup();
}
inputFile.addEventListener('change', inputFileChangeHandler);
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
function buttonCloseMessageClickHandler () {
  closeMessage();
}
//Обработчик нажатия на эскейп
function documentKeydownHandler (evt) {
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
function overlayClickHandler(evt) {
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
  buttonCloseMessage.addEventListener('click', buttonCloseMessageClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', overlayClickHandler);
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
  showMessage(errorTemplateMessageServer, '.error__button--server');
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
