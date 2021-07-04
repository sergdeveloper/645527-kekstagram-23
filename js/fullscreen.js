import { createNewElement } from './utils.js';

const bigPictureWrapper = document.querySelector('.big-picture');
const bigPicture = bigPictureWrapper.querySelector('.big-picture__img');
const likesCount = bigPictureWrapper.querySelector('.likes-count');
const commentsCount = bigPictureWrapper.querySelector('.comments-count');
const commentsList = bigPictureWrapper.querySelector('.social__comments');
const commentsFragment = document.createDocumentFragment();
const commentsItem = commentsList.children;
const textDescription = bigPictureWrapper.querySelector('.social__caption');
const commentsCountWrapper = bigPictureWrapper.querySelector('.social__comment-count');
const commentsLoader = bigPictureWrapper.querySelector('.comments-loader');
const bigPictureImage = bigPicture.querySelector('img');
const avatarWidth = '35';
const avatarHeigth = '35';
const commentsOnScreen = 5;

const createComment = () => {
  const commentUser = createNewElement('li', 'social__comment');
  const user = createNewElement('img', 'social__picture');
  user.width = avatarWidth;
  user.height = avatarHeigth;
  commentUser.appendChild(user);
  const textComment = createNewElement('p', 'social__text');
  commentUser.appendChild(textComment);
  return commentUser;
};

const createComments = (amount) => {
  const commentAmount = (amount >= commentsOnScreen) ? commentsOnScreen : amount;

  for (let i = 1; i <= commentAmount; i++) {
    commentsFragment.appendChild(createComment());
  }

  commentsList.appendChild(commentsFragment);
};

const addCommnetsContent = (comments) => {

  for (let i = 0; i < commentsItem.length; i++) {
    const commentUser = commentsItem[i];
    const avatar = commentUser.querySelector('.social__picture');
    avatar.src = comments.avatar;
    avatar.alt = comments.author;
    const textComment = commentUser.querySelector('.social__text');
    textComment.textContent = comments.text;
  }
};

const editComments = (picture) => {
  for (let i = commentsItem.length - 1; i >= 0; i--) {
    commentsItem[i].remove();
  }
  createComments(2);
  addCommnetsContent(picture.comment);

  commentsCountWrapper.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const fullscreen = (picture) => {
  bigPictureWrapper.classList.remove('hidden');
  bigPictureImage.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.description.length;
  textDescription.textContent = picture.description;
  editComments(picture);
  document.body.classList.add('modal-open');
};

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    bigPictureWrapper.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

const  fullscreenClose = document.querySelector('.big-picture__cancel');
fullscreenClose.addEventListener('click', function(){
  bigPictureWrapper.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

export { bigPictureWrapper, fullscreen };
