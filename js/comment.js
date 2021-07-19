import { createNewElement } from './utils.js';
const commentsFragment = document.createDocumentFragment();
const bigPictureWrapper = document.querySelector('.big-picture');
const commentsList = bigPictureWrapper.querySelector('.social__comments');
const commentsItem = commentsList.children;
const loadMore = document.querySelector('.social__comments-loader');
const avatarWidth = '35';
const avatarHeigth = '35';
const commentsOnScreen = 5;
const currentComments = bigPictureWrapper.querySelector('.current-count');
//Создание одного комментария
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
//Создание всех комментариев
const createComments = (amount) => {
  const commentAmount = (amount >= commentsOnScreen) ? commentsOnScreen : amount;
  for (let i = 1; i <= commentAmount; i++) {
    commentsFragment.appendChild(createComment());
  }
  commentsList.appendChild(commentsFragment);
};
//Добавляет контент
const addCommnetsContent = (comments) => {
  for (let i = 0; i < commentsItem.length; i++) {
    const commentUser = commentsItem[i];
    const avatar = commentUser.querySelector('.social__picture');
    avatar.src = comments[i].avatar;
    avatar.alt = comments[i].name;
    const textComment = commentUser.querySelector('.social__text');
    textComment.textContent = comments[i].message;
  }
};
//Убрать магические числа

const editComments = (picture) => {

  const maxComments = picture.comments.length;
  let currentLoadedComments = 0;
  let commentsLeftToLoad = picture.comments.length;
  let imageLoadedComments;
  for (let i = commentsItem.length - 1; i >= 0; i--) {
    commentsItem[i].remove();
  }
  if (maxComments > 5 && commentsLeftToLoad >= 5) {
    createComments(5);
    addCommnetsContent(picture.comments);
    commentsLeftToLoad -=5;
    currentLoadedComments +=5;
    loadMore.addEventListener('click', () => {
      if(currentLoadedComments < maxComments && commentsLeftToLoad >= 5){
        createComments(5);
        addCommnetsContent(picture.comments);
        commentsLeftToLoad -=5;
        currentLoadedComments +=5;
        imageLoadedComments = currentLoadedComments.toString();
        currentComments.textContent = imageLoadedComments;
      }
      else {
        createComments(commentsLeftToLoad);
        addCommnetsContent(picture.comments);
        currentLoadedComments +=commentsLeftToLoad;
        imageLoadedComments = currentLoadedComments.toString();
        currentComments.textContent = imageLoadedComments;
        loadMore.classList.add('hidden');
      }
    });
  }else {
    createComments(maxComments);
    addCommnetsContent(picture.comments);
    loadMore.classList.add('hidden');
    currentLoadedComments = maxComments;
    imageLoadedComments = currentLoadedComments.toString();
    currentComments.textContent = imageLoadedComments;
  }
};
export {editComments};
