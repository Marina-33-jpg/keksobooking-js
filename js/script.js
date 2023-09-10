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

//Функция взята  из интернета и доработана
//Источник - http://github.com/you-dont-need/You-Dont-
//Need-Ladash-Underscore#_random
const getRandomPositiveInteger  = (a, b) => {
  const lower =  Math.ceil(Math.min(Math.abs(a), Math. abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math. abs(b)));
  const result = Math.random( ) * (upper-lower + 1) +lower;
  return Math.floor(result);
};

//случайный выбор элемента массива
const getRandomArrayElement  = (array) => array[getRandomPositiveInteger(0, array.length-1)];


//сравнение строки комментария с максимальнодопустимой длиной
const checkStringLength = (string, length) => string.length <= length;

//Функция взята  из интернета и доработана
//Источник - http://github.com/you-dont-need/You-Dont-
//Need-Ladash-Underscore#_random
const getRandomPositiveFloat  = (a, b, digits = 1) => {

  const lower = Math.min(Math.abs(a), Math. abs(b));
  const upper = Math.max(Math.abs(a), Math. abs(b));
  const result = Math.random() * (upper-lower ) +lower;
  return +result.toFixed(digits);
};

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
console.log(getSuccess());
