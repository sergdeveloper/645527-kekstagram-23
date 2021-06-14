//случайное число из диапазона

const getRandom = function (minimal, maximal) {
  if (minimal > 0 && maximal > 0 && minimal < maximal) {
    return Math.floor(Math.random() * (maximal - minimal + 1)) + minimal;
  }
  else {
    return 'Минимальное число не может быть отрицательным и больше макисмального';
  }
};

getRandom (100, 90);

//проверка длины комментария

const getLength = function (field, amount) {
  if (field.length <= amount) {
    return 'Комментарий отправлен';
  }
  else {
    return 'Превышен лимит символов';
  }
};

getLength(100, 140);

const mass = [];

const textArray = ['Всё отлично!','В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Андрей', 'Иван', 'Алексей', 'Дмитрий', 'Антон', 'Максим'];

const comments = [];
const createObjects = function(number){
  for (let i = 0; i < number; i++) {
    comments.push({
      id: i+1,
      avatar: 'img/avatar-' + getRandom(1,6) +'.svg',
      text: textArray[Math.floor(Math.random()*textArray.length)],
      name: names[Math.floor(Math.random()*names.length)],
    });
  }

  for (let i = 0; i < number; i++) {
    mass.push({
      id: i+1,
      url: 'photos/i' + i +'.jpg',
      description: 'Введите описание фотографии',
      likes: getRandom(25, 200),
      comment: comments[Math.floor(Math.random()*names.length)],
    });
  }
  return mass;
};
createObjects(25);
