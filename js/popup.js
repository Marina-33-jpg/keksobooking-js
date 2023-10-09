import {getAdvertisements}  from  '/js/data.js';

//import { showBigSuccess } from '/js/big-success.js';
const typesOffer = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
// отрисовка на основе временных данных и шаблона #card
const container = document.querySelector('.popup'); //родительский узел для контейнера

const popupTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');


const createPopup = (data) => {
 // const {location, offer, id, author} = data;//замыкание на клик

  const card = popupTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = data.author.avatar;//

  card.querySelector('.popup__title').textContent = data.offer.title;
  card.querySelector('.popup__text--address').textContent = data.offer.address;
  card.querySelector('.popup_text--price').textContent = data.offer.price ? `${offer.price} ₽/ночь`: '';

  card.querySelector('.popup__type') = typesOffer[data.offer.type];
  card.querySelector('.popup__text popup__text--capacity').textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей` ;
  card.querySelector('.popup__text popup__text--time').textContent = `Заезд после ${data.offer.checkin}, выезд ${data.offer.checkout}`;

  // особенности жилья
  const featuresContainer = card.querySelector('.popup__features') ;
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  features = data.offer.features;

  featuresList.forEach((featuresListItem) => {
    const isNecessary = features.some(   // ???
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`)
    );
    if (!isNecessary) {
     // featuresListItem.remove(); ??????
    }
  });

  card.querySelector('.popup__description').textContent = data.offer.description;

  //фото жилья
  const photoContainer = card.querySelector('.popup__photos');
  const photoClone = card.querySelector('.popup__photo').cloneNode(true);
  const photos = data.offer.photos;

  photoContainer.innerHTML = '';

  photos.forEach((photoUrl) => {
    const eClone = photoClone.cloneNode(true);
    eClone.src = photoUrl;
    photoContainer.appendChild(eClone);
  });

  return card;
};

//отрисовать сгенерированные ДОМ-элементы в блок
const renderAdvertisements = (datas) => {
  //Для вставки элементов использовать DocumentFragment
  const fragment = document.createDocumentFragment();
  //перебираем
  datas.forEach((data) => {
    const dataElement = createPopup(data);
    fragment.append(dataElement);
  });
  container.append(fragment);
};

console.log(renderAdvertisements(getAdvertisements()));
//Подключить модуль в проект

export { renderAdvertisements };

