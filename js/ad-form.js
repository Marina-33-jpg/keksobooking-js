import {createSlider, successSendingSliderValue} from '/js/ad-form-slider.js';
//import {resetFilters} from '/js/filter.js';

const adForm = document.querySelector('.ad-form'); //74 форма нового (вашего) объявления
const formElements = adForm.children;
const mapForm = document.querySelector('.map__filters'); //26 форма фильтрации объявлений на карте
const mapFilters = mapForm.children;

const adFormReset = document.querySelector('.ad-form__reset');
const adFormSubmit = adForm.querySelector('.ad-form__submit');

const typeHousing = adForm.querySelector('[name="type"]');
const price = adForm.querySelector('[name="price"]');
const address = document.querySelector('#address');


const TYPE_HOUSING_OPTIONS = {
  'bungalow' : '0',
  'flat' : '1000',
  'hotel' : '3000',
  'house' : '5000',
  'palace' : '10000',
};

const ROOM_NUMBER_OPTIONS = {
  '1' : '1',
  '2' : ['2', '1'],
  '3' : ['3', '2', '1'],
  '100' : '0',
};

const ROUND_COORDINATE = 5;

/****************************************************************/
//дезактивация формы
const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', true);
  }
}
const disableFilters = () => {
  mapForm.classList.add('map__filters--disabled');
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute('disabled', true);
  }
}
//активация формы
const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
}
const enableFilters = () => {
  mapForm.classList.remove('map__filters--disabled');
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled');
  }
}
export {disableAdForm, disableFilters, enableAdForm, enableFilters } ;
/***********************************************************************/

//проверка перед публикацией
function setFormSubmit ({pristine, reset}) {
  const blockSubmitButton = () => {
    adFormSubmit.disabled = true;
  };

  const unblockSubmitButton = () => {
    adFormSubmit.disabled = false;
  };

   //перед отправкой формы
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      // отправляем валидную форму на публикацию
      reset();

    }
  });
}
/************************************************************/
// {resetPosition, setUpMainMarkerMove}- берем из map.js !!!
function initAdForm () {
  const pristine = new Pristine(adForm, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
  });
  /* -------------------------------------*/
  //аватар пользователя
  //фото жилья

  //валидация количества комнат и количества мест      -130
  const roomNumber = adForm.querySelector('[name="rooms"]'); //125
  const capacity = adForm.querySelector('[name="capacity"]'); //134

  function validateRoomNumber () {
    return ROOM_NUMBER_OPTIONS[roomNumber.value].includes(capacity.value);
    //выбор количества комнат включает выбранное количество гостей
  }

  pristine.addValidator( roomNumber , validateRoomNumber, '100 комнат не для гостей, допустимо в 3 комнаты - до трёх гостей, в 2 комнаты - до двух гостей');
  pristine.addValidator(capacity, validateRoomNumber, 'на ваш выбор комнат не допустимо столько гостей');

  capacity.addEventListener('change', () => {
    pristine.validate(roomNumber);
  });

  /*второй параметр initAdForm
  setUpMainMarkerMove ((evt) => {
    address.value = `${(evt.lat).toFixed(ROUND_COORDINATE)},${(evt.lng).toFixed(ROUND_COORDINATE)}`;
  });*/

  //цена нза жилье
  function validatePrice (value) {
    return Number(value) >= TYPE_HOUSING_OPTIONS[typeHousing.value];//??   && Number(value)<=100000
  }

  function getErrorMessagePrice () {
    return `цена за ночь допустима от ${TYPE_HOUSING_OPTIONS[typeHousing.value]} до 100000`;
  }

  pristine.addValidator(price, validatePrice, getErrorMessagePrice);

  typeHousing.addEventListener('change', () => {
    price.placeholder = TYPE_HOUSING_OPTIONS[typeHousing.value];
    pristine.validate(price);
  });

  // устанавливаем цену слайдером
  const {setValue, setSlideEventInput, resetSliderValue} = createSlider (typeHousing, pristine.validate, TYPE_HOUSING_OPTIONS);

  setSlideEventInput(price);

  resetSliderValue(adFormReset);

  price.addEventListener ('change', () => {
    setValue (price.value);
  });

  //время заезда/выезда
  const timein = adForm.querySelector('#timein'); // -118
  const timeout = adForm.querySelector('#timeout'); //  123
  const timeinAndTimeout = adForm.querySelector('.ad-form__element--time'); //  -116

  function validateTimeIn (value) {
    return value === timeout.value;
  }

  function validateTimeout(value) {
    return value === timein.value;
  }

pristine.addValidator(timein,  validateTimeIn,  'время заезда должно совпадать с временем выезда');
pristine.addValidator(timeout, validateTimeout, 'время заезда должно совпадать с временем выезда');

timeinAndTimeout.addEventListener('change', (evt) => {
  if (evt.target.value) {
    timeout.value = timein.value = evt.target.value;
  }
});

function reset () {
  //resetPosition;//закрыть карту -первый параметр initAdForm
  //adForm.reset();
  //закрыть фильтры
}

setFormSubmit({pristine, reset});

adFormReset.addEventListener('click', () => {
  reset ();
});
}

export {initAdForm};
