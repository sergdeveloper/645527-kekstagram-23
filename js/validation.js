import { getLength } from './utils.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_COUNT_HASHTAGS = 5;

const formDownloadPicture = document.querySelector('#upload-select-image');
const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay');
const inputHashtag = popupEditor.querySelector('#input-hashtag');
const inputComment = popupEditor.querySelector('#input-comment');

function checkSameHashtags (hashtag) {
  const regExp = /^#[A-Za-zА-Яа-я0-9]{1,19}$/; //число 19 - не более 19 символов после решетки
  return regExp.test(hashtag);
}

function checkInputIsActive () {
  const currentElement = document.activeElement;
  return currentElement === inputHashtag || currentElement === inputComment;
}

function checkHashtags () {
  const hashtags = inputHashtag.value.split(' ');
  const noTooMuchHashtags = hashtags.length <= MAX_COUNT_HASHTAGS;
  let allHashtagsCorrect = true;
  let noHashtagMatches = true;
  if(inputHashtag.value === '') {
    return {
      noTooMuchHashtags: true,
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
    noTooMuchHashtags: noTooMuchHashtags,
    allHashtagsCorrect: allHashtagsCorrect,
    noHashtagMatches: noHashtagMatches,
  };
}

function printMessagesValidationHashtag() {
  const resultCheckHashtags = checkHashtags();

  if(!resultCheckHashtags.noTooMuchHashtags) {
    inputHashtag.setCustomValidity('Хэш-тегов должно быть не больше пяти');
    inputHashtag.classList.add('input-error');
  }

  else if (!resultCheckHashtags.allHashtagsCorrect) {
    inputHashtag.setCustomValidity('Хэш-тег начинается с решётки, затем не менее 1, не более 20 символов: буквы и/или цифры');
    inputHashtag.classList.add('input-error');
  }

  else if (!resultCheckHashtags.noHashtagMatches) {
    inputHashtag.setCustomValidity('Хэш-теги не должны повторяться. Строчные и прописные буквы не различаются');
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

function checkComment () {
  if(!getLength(inputComment.value, MAX_LENGTH_COMMENT)) {
    inputComment.setCustomValidity('Комментарий не может быть длинее 140 символов');
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
  printMessagesValidationHashtag();
}

function commentInputHandler () {
  checkComment();
}

export { checkInputIsActive, inputHashtag, inputComment, hashtagInputHandler, commentInputHandler };