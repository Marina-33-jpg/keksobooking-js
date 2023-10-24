import {getAdvertisements} from '/js/data.js';

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
const createPopup = (data) => {

  const card = popupTemplateContent.cloneNode(true);

  const avatar = card.querySelector('.popup__avatar');
  avatar.src = data.author.avatar;
  if (!avatar.src) {
    avatar.remove();
  }

  card.querySelector('.popup__title').textContent = data.offer.title;
  card.querySelector('.popup__text--address').textContent = data.offer.address;
  card.querySelector('.popup_text--price').textContent = data.offer.price ? `${offer.price} ₽/ночь`: '';
  card.querySelector('.popup__type') =  offerTypes[data.offer.type];

  const capacity = card.querySelector('.popup__text popup__text--capacity');
  capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей` ;
  if (!data.offer.rooms || !data.offer.guests) {
    capacity.remove();
  }

  const time = card.querySelector('.popup__text popup__text--time');
  time.textContent = `Заезд после ${data.offer.checkin}, выезд ${data.offer.checkout}`;
  if (!data.offer.checkin || !data.offer.checkout) {
    time.remove();
  }
  // дополнительные удобства жилья
  const featuresContainer = card.querySelector('.popup__features') ;
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  features = data.offer.features;
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

    //card.querySelector('.popup__description').textContent = data.offer.description;
  const description = card.querySelector('.popup__description');
  description = data.offer.description;
  if (!data.offer.description) {
     description.remove();
  }

  //фото жилья
  const photoContainer = card.querySelector('.popup__photos');
  const photoClone = card.querySelector('.popup__photo').cloneNode(true);
  const photos = data.offer.photos;

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

//!!отрисовать НЕ ТРЕБУЕТСЯ !!сгенерированные ДОМ-элементы в блок
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


const container = document.querySelector('#map-canvas');
renderAdvertisements(getAdvertisements());
//Подключить модуль в проект

export { createPopup };

