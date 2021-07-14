import { editComments } from './comment.js';
const bigPictureWrapper = document.querySelector('.big-picture');
const bigPicture = bigPictureWrapper.querySelector('.big-picture__img');
const likesCount = bigPictureWrapper.querySelector('.likes-count');
const commentsCount = bigPictureWrapper.querySelector('.comments-count');
const textDescription = bigPictureWrapper.querySelector('.social__caption');
const bigPictureImage = bigPicture.querySelector('img');
//Отрисовка фуллскрина при нажатии на превью
const fullscreen = (picture) => {
  bigPictureWrapper.classList.remove('hidden');
  bigPictureImage.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  textDescription.textContent = picture.description;
  editComments(picture);
  document.body.classList.add('modal-open');
};
//Обработчик нажатия на Эскейп
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    bigPictureWrapper.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});
//Закрытие фуллскрина, через кнопку "закрыть"
const  fullscreenClose = document.querySelector('.big-picture__cancel');
fullscreenClose.addEventListener('click', function(){
  bigPictureWrapper.classList.add('hidden');
  document.body.classList.remove('modal-open');
});
export { bigPictureWrapper, fullscreen };
