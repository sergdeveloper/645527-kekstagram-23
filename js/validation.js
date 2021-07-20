import { getLength } from './utils.js';
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const formDownloadPicture = document.querySelector('#upload-select-image');
const overlayEditor = formDownloadPicture.querySelector('.img-upload__overlay');
const inputHashtag = overlayEditor.querySelector('.text__hashtags');
const inputComment = overlayEditor.querySelector('.text__description');
//Проверка активности инпута
function checkInputIsActive () {
  const activeElement = document.activeElement;
  return activeElement === inputHashtag || activeElement === inputComment;
}
//Проверка хэштегов на соответствие условиям (сделал как подсказывали в самом ДЗ, возможно позже вернусь)
function checkSameHashtags (hashtag) {
  const regExp = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  return regExp.test(hashtag);
}
//Проверка хэштегов на соответствие условиям (сделал как подсказывали в самом ДЗ, возможно позже вернусь)
function checkHashtags () {
  const hashtags = inputHashtag.value.split(' ');
  const notManyHashtags = hashtags.length <= MAX_HASHTAGS_COUNT;
  let allHashtagsCorrect = true;
  let noHashtagMatches = true;
  if(inputHashtag.value === '') {
    return {
      notManyHashtags: true,
      allHashtagsCorrect: true,
      noHashtagMatches: true,
    };
  }
  for(let i = 0; i < hashtags.length; i++) {
    if(!checkSameHashtags(hashtags[i])) {
      allHashtagsCorrect = false;
    }
  }
  for(let i = 0; i < hashtags.length; i++) {
    for(let j = i+1; j < hashtags.length; j++) {
      if(hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        noHashtagMatches = false;
      }
    }
  }
  return {
    notManyHashtags: notManyHashtags,
    allHashtagsCorrect: allHashtagsCorrect,
    noHashtagMatches: noHashtagMatches,
  };
}
//Меняет стандартную валидацию и сообщения
function showInfoValidation() {
  const outcomeCheckHashtags = checkHashtags();
  if(!outcomeCheckHashtags.notManyHashtags) {
    inputHashtag.setCustomValidity('Не более 5 хэштегов');
    inputHashtag.classList.add('input-error');
  }
  else if (!outcomeCheckHashtags.allHashtagsCorrect) {
    inputHashtag.setCustomValidity('Хэштег должен начинаться со знака решетки быть не короче 1 символа, и не длиннее 20 символов');
    inputHashtag.classList.add('input-error');
  }
  else if (!outcomeCheckHashtags.noHashtagMatches) {
    inputHashtag.setCustomValidity('Повторы хэштегов не допускаются. Регистр не учитывается');
    inputHashtag.classList.add('input-error');
  }
  else {
    inputHashtag.setCustomValidity('');
    if(inputHashtag.classList.contains('input-error')) {
      inputHashtag.classList.remove('input-error');
    }
  }
  inputHashtag.reportValidity();
}
//Проверка корректности сообщения
function checkComment () {
  if(!getLength(inputComment.value, MAX_COMMENT_LENGTH)) {
    inputComment.setCustomValidity('Превышен лимит символов');
    inputComment.classList.add('input-error');
  }
  else {
    inputComment.setCustomValidity('');

    if(inputComment.classList.contains('input-error')) {
      inputComment.classList.remove('input-error');
    }
  }
  inputComment.reportValidity();
}
function hashtagInputHandler () {
  showInfoValidation();
}
function commentInputHandler () {
  checkComment();
}
export { checkInputIsActive, hashtagInputHandler, commentInputHandler, inputHashtag, inputComment };
