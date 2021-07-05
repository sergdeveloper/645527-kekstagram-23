import { createFullGallery} from './photos.js';
import { createObjects } from './data.js';
import './validation.js';
import './form.js';
const objects = createObjects(25);
createFullGallery(objects);
