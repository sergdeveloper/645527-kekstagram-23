import { openFullscreen} from './fullscreen.js';
const miniPhoto = document.querySelector('#picture').content.querySelector('.picture');
const photosList = document.querySelector('.pictures');
const listNewFragment = document.createDocumentFragment();
//Создает превью в галерее из шаблона
const createFullGallery = function(objects){
  objects.forEach((picture) => {
    const photoElement = miniPhoto.cloneNode(true);
    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__comments').textContent = picture.comments.length;
    photoElement.querySelector('.picture__likes').textContent = picture.likes;
    photoElement.addEventListener('click', () => {
      openFullscreen(picture);
    });
    photosList.appendChild(photoElement);
  });
  photosList.appendChild(listNewFragment);
};
export {createFullGallery};


