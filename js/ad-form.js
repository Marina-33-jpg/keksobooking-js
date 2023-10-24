const adForm = document.querySelector('.ad-form'); //74 форма нового (вашего) объявления
const formElements = adForm.children;
const mapForm = document.querySelector('.map__filters'); //26 форма фильтрации объявлений на карте
const mapFilters = mapForm.children;

//дезактивация формы
const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', true);
  }

  mapForm.classList.add('map__filters--disabled');
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute('disabled', true);
  }
};

disableForm();

//активация формы
const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
};

activateForm();

const activateFilters = () => {
  mapForm.classList.remove('map__filters--disabled');
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled');
  }
};

activateFilters();


//валидация формы
const pristine = new Pristine(adForm,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'p',
    errorTextClass: 'ad-form__error'
  }, false);

//валидация заголовка -90
function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

//валидация цены -108
function validatePrice (value) {
  return Number(value) <= 100000;
}

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  'Максимальная цена — 100000'
);

//валидация количества комнат и количества мест
const rooms = adForm.querySelector('[name="rooms"]:checked'); //125
const capacity = adForm.querySelector('[name="capacity"]:checked'); //134
const quantityRoomsForGuests = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

function validateCapacity () {
  return quantityRoomsForGuests[rooms.value].includes(capacity.value);
}

pristine.addValidator(capacity, validateCapacity);
pristine.addValidator(rooms, validateCapacity);

//реализует логику обработки пользовательского ввода для полей
const price = adForm.querySelector('#price');
let type;
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validateMinPrice (value) {
  return Number(value) >= minPrice[type];
}

function getPriceErrorMessage () {
  return `минимальная цена за ночь ${minPrice[type]}`;
}

pristine.addValidator(price, validateMinPrice, getPriceErrorMessage);

function onTypeChange (evt) {
  price.placeholder = minPrice[evt.target.value];
  type = evt.target.value;
  pristine.validate(price);
}

adForm.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onTypeChange));

//время заезда/выезда
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

function validateTimeIn (value) {
  return value === timeout.value;
}

function validateTimeout(value) {
  return value === timein.value;
}

function getTimeErrorMessage() {
  return 'Время заезда должно совпадать с временем выезда';
}

pristine.addValidator(timein, validateTimeIn, getTimeErrorMessage);
pristine.addValidator(timeout, validateTimeout, getTimeErrorMessage);

//валидация перед отправкой формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

