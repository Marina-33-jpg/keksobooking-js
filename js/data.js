import {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement} from '/js/util.js';
//создаем массив обьектов временных данных

const Descriptions = [
  'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам.',
  'Квартира полностью укомплектована и недавно отремонтирована.',
  'Просторное жилье с видом на море.',
  'Прекрасно подойдет для семейного отдыха.',
  'У бунгала паркуй хоть ягуара.'
];

const Titles = [
  'Милая, уютная квартира в центре Токио',
  'Уютное гнездышко для молодоженов',
  'Комфортное жилье для большой семьи с маленькими питомцами',
  'Уютный домик с садом',
  'Шикарный отдых на берегу моря на своем пляже'
];

const Features = [
  ['wifi', 'dishwasher', 'parking', 'washer','elevator', 'conditioner'],
  [        'dishwasher', 'parking', 'washer','elevator', 'conditioner'],
  ['wifi',               'parking',          'elevator', 'conditioner'],
  ['wifi', 'dishwasher',           'washer',             'conditioner'],
  ['wifi',               'parking',                      'conditioner'],
  ['wifi',                                   'elevator', 'conditioner'],
  ['wifi',                                   'elevator'               ],
  ['wifi',               'parking', 'washer','elevator'               ],
  ['wifi', 'dishwasher',            'washer','elevator', 'conditioner'],
  ['wifi',               'parking', 'washer','elevator', 'conditioner'],
  ['wifi',               'parking',          'elevator', 'conditioner'],
  ['wifi', 'dishwasher',            'washer','elevator'               ],
  [                      'parking',          'elevator'               ]
];

const PhotoUrls = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6Awr1i0Iw.jpg'
];


//на основе замыкания
//генератор для получения уникальных идентификаторов   на основе замыкания
//function createIdGenerator () {
/*const getCreateIdGenerator = () =>  {
  let lastGeneratedId = 0;
  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};
*/
//на основе замыкания
//генератор для получения случайных уникальных идентификаторов из указанного диапазона(пока не будут все перебраны)
//function  createRandomIdFromRangeGenerator(min, max) {
/*const  getCreateRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function() {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max-min+1)) { // заменить скобку на ( Math.abs(max-min) +1 )
      //console.error(`Перебраны все числа из диапазона от ${min} до ${max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};
*/

const createMessage = () =>
  Array.from({length:getRandomPositiveInteger(1, 2)}, () => getRandomArrayElement(Descriptions)).join(' ');
//строка склеивается из массива с размером случайно 1 или 2 строки из случайно выбранных элементов Descriptions

const createLocation = () => ({
  lat: getRandomPositiveFloat( 35.65000,  35.70000, 2),
  lng: getRandomPositiveFloat(139.70000, 139.80000, 2),
});

const createAddress = (loc) => `${loc.lat}, ${loc.lng}`;

const createAuthor = (index) => ({
  id: index,
  avatar: index<10 ? `img/avatars/user0${index}.png` : `img/avatars/user${index}.png`,
});


const createOffer = (loc) => ({
  title: getRandomArrayElement(Titles),
  address: createAddress(loc),
  price: getRandomPositiveInteger(10, 100),
  type:  getRandomArrayElement(['palace', 'flat', 'house', 'bungalow', 'hotel']),
  rooms:  getRandomPositiveInteger(1, 6),
  guests: getRandomPositiveInteger(1, 10),
  checkin:  getRandomArrayElement(['12:00', '13:00','14:00']),
  checkout: getRandomArrayElement(['12:00', '13:00','14:00']),
  features: getRandomArrayElement(Features),
  discription: createMessage(),
  photos : getRandomArrayElement(PhotoUrls),
});

const createSuccess = (index) => {
  const a = createLocation();
  return {
  location: a,
  offer: createOffer(a),
  id: index,
  author: createAuthor(index),
  };
}

//собирает в массив из 10 элементов из обьектов createSuccess
const getSuccess = () => Array.from({length:3}, (_, index) => createSuccess(index+1) );

export {getSuccess};