// Настройка слайдера
const STEP_COUNT = 1000 ;
const MAX_COUNT_VALUE =100000 ;

const adFormSlider = document.querySelector('.ad-form__slider'); // -114

function createSlider(typeHousing, checkValidation, TYPE_HOUSING_OPTIONS) {
  //создаем слайдер
  // в создании используем первый и третий параметры createSlider
  // минимальная цена  - TYPE_HOUSING_OPTIONS[typeHousing.value]
  //const currentStart =  TYPE_HOUSING_OPTIONS[typeHousing.value];
  noUiSlider.create(adFormSlider, {
    range: {
      min: 0,
      max: MAX_COUNT_VALUE,
    },
    start: TYPE_HOUSING_OPTIONS[typeHousing.value],
    step: STEP_COUNT,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  // установим взаимосвязь  поля ввода цены со слайдером
  //второй возвратный элемент
  function setSlideEventInput (price) {
    adFormSlider.noUiSlider.on('update' , () => {
      price.value = adFormSlider.noUiSlider.get();
      checkValidation(price);//это второй параметр createSlider
    });
  }
  //первый возвратный элемент
  function setValue (value) {
    adFormSlider.noUiSlider.set(value);
  }
  //третий возвратный элемент
  function resetSliderValue (resetB) {
    resetB.addEventListener ('click', () => {
      adFormSlider.noUiSlider.reset(); //??
    });
  }

  // изменение минимального значения слайдера
  typeHousing.addEventListener('change', (evt) => {
    const type = evt.target.value;
    //при изменении минимальной цены - меняем установки слайдера
    if (TYPE_HOUSING_OPTIONS[type]) {
      adFormSlider.noUiSlider.updateOptions({
        range: {
          min: Number(TYPE_HOUSING_OPTIONS[type]),
          max: MAX_COUNT_VALUE,
        },
        step: STEP_COUNT,
      });
    }
  });

  return {setValue, setSlideEventInput, resetSliderValue};
}

function successSendingSliderValue () {
  adFormSlider.noUiSlider.reset();// set( currentStart)?
}

export {createSlider, successSendingSliderValue};
