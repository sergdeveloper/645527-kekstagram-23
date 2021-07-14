import { createFullGallery} from './photos.js';
import { createObjects } from './data.js';
import './validation.js';
import './form.js';



fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((picture) => {
  console.log(picture);
  createFullGallery(picture);
});
