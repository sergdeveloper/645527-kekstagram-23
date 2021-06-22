import {createObjects} from './data.js';
const miniPhoto = document.querySelector('#picture')
  .content;
const photosList = document.querySelector('.pictures');
const userPhotos = createObjects();
const picturesFragment = document.createDocumentFragment();
userPhotos.forEach(({url, description, likes}) => {
  const photoElement = miniPhoto.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = description.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photosList.appendChild(photoElement);
});

photosList.appendChild(picturesFragment);
