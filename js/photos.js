import {createObjects} from './data.js';
const miniPhoto = document.querySelector('#picture');
const photosList = document.querySelector('.pictures');
const userPhotos = createObjects();

const photoElement = miniPhoto.cloneNode(true);
photosList.appendChild(photoElement);
console.log('done');