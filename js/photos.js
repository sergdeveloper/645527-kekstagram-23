import { fullscreen} from './fullscreen.js';
const miniPhoto = document.querySelector('#picture').content.querySelector('.picture');
const photosList = document.querySelector('.pictures');
const listNewFragment = document.createDocumentFragment();

const createFullGallery = function(objects){
  objects.forEach((picture) => {
    const photoElement = miniPhoto.cloneNode(true);
    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__comments').textContent = picture.description.length;
    photoElement.querySelector('.picture__likes').textContent = picture.likes;
    photoElement.addEventListener('click', function () {
      fullscreen(picture);
    });
    photosList.appendChild(photoElement);
  });
  photosList.appendChild(listNewFragment);
};
export {createFullGallery};


