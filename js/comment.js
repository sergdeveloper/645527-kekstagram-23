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
    avatar.src = picture.comments.avatar;
    avatar.alt = picture.comments.author;
    const textComment = commentUser.querySelector('.social__text');
    textComment.textContent = comments.text;
  }
};
//Убрать магические числа
const editComments = (picture) => {
  for (let i = commentsItem.length - 1; i >= 0; i--) {
    commentsItem[i].remove();
  }
  let currentLoadedComments = 5;
  const maxComments = picture.comments.length;
  createComments(5);
  addCommnetsContent(picture.comment);
  loadMore.addEventListener('click', function(){
    if (currentLoadedComments < maxComments){
      createComments(5);
      addCommnetsContent(picture.comment);
      currentLoadedComments += 5;
      const imageLoadedComments = currentLoadedComments.toString();
      currentComments.textContent = imageLoadedComments;
    } else {
      loadMore.classList.add('hidden');
    }
  });
};
export {editComments};
