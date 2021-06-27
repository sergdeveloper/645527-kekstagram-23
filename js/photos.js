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

const popup = document.querySelector('.big-picture');
const preview = document.querySelectorAll('.picture');
const likes = document.querySelectorAll('.picture__likes')
const imgUrl = document.querySelectorAll('.picture__img')
const imgComments = document.querySelectorAll('.picture__comments')
const commentPicture = avatar.src;

const clickOnPrev = function(prev, imgUrl, likes, imgComments, commentPicture){
  prev.addEventListener('click', function(evt){
    evt.preventDefault();
    popup.classList.remove('hidden');
    popup.querySelector('.likes-count').textContent = likes.textContent;
    popup.querySelector('.social__caption').textContent = imgComments.textContent;
    popup.querySelector(".big-picture__img img").src = imgUrl.src;
    popup.querySelector(".social__picture").src = avatar.src;
  })
}

for (let i = 0; i < preview.length; i++) {
  clickOnPrev (preview[i], imgUrl[i], likes[i], imgComments[i], commentPicture[i]);
}

