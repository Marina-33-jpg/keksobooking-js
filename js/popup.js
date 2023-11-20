import {getData} from '/js/data.js';

const offerTypes = {
  "flat": "Квартира",
  "bungalow": "Бунгало",
  "house": "Дом",
  "palace": "Дворец",
  "hotel": "Отель",
};


const popupTemplate = document.querySelector('#card').content;
const popupTemplateContent = popupTemplate.querySelector('.popup');

// отрисовка шаблона #card
const createPopup = ({offer,author}) => {

  const card = popupTemplateContent.cloneNode(true);

  const avatar = card.querySelector('.popup__avatar');
  avatar.src = author.avatar;
  if (!avatar.src) {
    avatar.remove();
  }

  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${ offer.price } ₽/ночь`;
  card.querySelector('.popup__type').textContent =  offerTypes[offer.type];

  const capacity = card.querySelector('.popup__text--capacity');
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  if (!offer.rooms || !offer.guests) {
    capacity.remove();
  }

  const time = card.querySelector('.popup__text--time');
  time.textContent = `Заезд после ${offer.checkin}, выезд ${offer.checkout}`;
  if (!offer.checkin || !offer.checkout) {
    time.remove();
  }

  // дополнительные удобства жилья
  const featuresContainer = card.querySelector('.popup__features') ;
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const features = offer.features;
  if (features) {
    featuresList.forEach((featuresListItem) => {
    const isNecessary = features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
    );
    if (!isNecessary) {
      featuresListItem.remove(); //удаляем ненужные удобства
    }
    });
  } else {featuresContainer.remove();}

  const description = card.querySelector('.popup__description');
   description.textContent = offer.description;
  if (!offer.description) {
     description.remove();
  }

  //фото жилья
  const photoContainer = card.querySelector('.popup__photos');
  const photoClone = card.querySelector('.popup__photo').cloneNode(true);
  const photos = offer.photos;

  photoContainer.innerHTML = '';
  if (photos) {
    photos.forEach((photoUrl) => {
    const eClone = photoClone.cloneNode(true);
    eClone.src = photoUrl;
    photoContainer.appendChild(eClone);
    });
  } else {photoContainer.remove();}

  return card;
};

/*!!отрисовать НЕ ТРЕБУЕТСЯ !!сгенерированные ДОМ-элементы в блок
const renderAdvertisements = (datas) => {
  //Для вставки элементов использовать DocumentFragment
  const fragment = document.createDocumentFragment();
  //перебираем
  datas.forEach((data) => {
    const dataElement = createPopup(data);
    fragment.append(dataElement);
  });
  container.append(fragment);
};*/

/*
const datas = getData();
const first = datas[1];
console.log(first);
//Для вставки элементов использовать DocumentFragment
const fragment = document.createDocumentFragment();
const dataElement = createPopup(first);
fragment.append(dataElement);
document.querySelector('#map-canvas').append(fragment);
*/
export { createPopup };
